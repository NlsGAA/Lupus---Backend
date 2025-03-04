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
                    title: z.string().min(3),
                    value: z.string().min(1),
                    dueDate: z.string(),
                    paymentKey: z.string().nullable(),
                    paid: z.boolean(),
                }),
                response: {
                    201: z.object({
                        financialBillId: z.string(),
                    }),
                },
            },
        },
        async (req, res) => {
            const { title, value, dueDate, paymentKey, paid } = req.body

            const { financialBillId } = await createFinancialBill({
                title,
                value,
                dueDate,
                paymentKey,
                paid
            })

            return res.status(201).send({
                financialBillId
            })
        }
    )    
}