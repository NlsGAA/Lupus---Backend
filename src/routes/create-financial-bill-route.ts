import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createFinancialBill } from '../functions/create-financial-bill'

export const createFinancialBillRoute: FastifyPluginAsyncZod = async app => {
    app.post(
        '/financial-bill/create',
        {
            schema: {
                summary: 'Create a new financial bill',
                tags: ['financial-bill'],
                body: z.object({
                    userId: z.coerce.number(),
                    title: z.string().min(3),
                    value: z.number().min(0.01),
                    dueDate: z.string(),
                    paymentKey: z.string().nullable(),
                    isPaid: z.boolean(),
                }),
                response: {
                    201: z.object({
                        financialBillId: z.string(),
                    }),
                },
            },
        },
        async (req, res) => {
            const { userId, title, value, dueDate, paymentKey, isPaid } = req.body

            const { financialBillId } = await createFinancialBill({
                userId,
                title,
                value,
                dueDate,
                paymentKey,
                isPaid
            })

            return res.status(201).send({
                financialBillId
            })
        }
    )
}