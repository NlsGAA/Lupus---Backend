
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { listAllFinancialBill } from '../functions/list-all-financial-bills'

export const listAllFinancialBillsRoute: FastifyPluginAsyncZod = async app => {
    app.get(
        '/financial-bill/list',
        {
            schema: {
                summary: 'List all financial bills',
                tags: ['financial-bill'],
                response: {
                    200: z.object({
                        financialBills: z.array(z.object({
                            id: z.string(),
                            title: z.string(),
                            value: z.string(),
                            dueDate: z.string(),
                            paymentKey: z.string().nullish(),
                            paid: z.boolean(),
                            createdAt: z.date(),
                        })),
                    }),
                },
            },
        },
        async (req, res) => {
            const financialBills = await listAllFinancialBill()

            return res.status(200).send({
                financialBills
            })
        }
    )    
}