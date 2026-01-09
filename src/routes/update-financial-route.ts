import { z } from 'zod'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { updateFinancialBill } from '../functions/update-financial'
import { getBillInfo } from '../functions/get-bill-info'

export const updateFinancialBillRoute: FastifyPluginAsyncZod = async app => {
    app.patch(
        '/financial/:id/update',
        {
            schema: {
                summary: 'Update a financial bill',
                tags: ['financial-bill'],
                body: z.object({
                    id: z.string(),
                    title: z.string().min(3),
                    valueInCents: z.number().min(1),
                    dueDate: z.string().min(10).max(10),
                    paymentKey: z.string().nullish(),
                    isPaid: z.boolean(),
                }),
                response: {
                    200: z.object({
                        message: z.string(),
                        financialBill: z.object({
                            id: z.string(),
                            userId: z.number(),
                            title: z.string(),
                            valueInCents: z.number(),
                            dueDate: z.string(),
                            paymentKey: z.string().nullish(),
                            isPaid: z.boolean(),
                            createdAt: z.date().nullish(),
                            updatedAt: z.date().nullish(),
                        }),
                    }),
                },
            },
        },
        async (req, res) => {
            const { id } = req.body

            const isBillCreated = await getBillInfo(id)

            if (!isBillCreated) {
                throw new Error('Cannot update a bill that does not exist.')
            }

            const updatedBill = await updateFinancialBill(req.body)

            return res.send({
                message: 'Conta atualizada com sucesso!',
                financialBill: updatedBill,
            })
        }
    )
}