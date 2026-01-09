
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { listAllFinancialBill } from '../functions/list-all-financial-bills'
import { updateBillsCache } from '../lib/bills-cache'

export const listAllFinancialBillsRoute: FastifyPluginAsyncZod = async app => {
    app.get(
        '/financial-bill/list',
        {
            schema: {
                summary: 'List all financial bills',
                tags: ['financial-bill'],
                response: {
                    200: z.object({
                        wallet: z.object({
                            unpaidBillsAmount: z.number(),
                        }),
                        financialBills: z.array(z.object({
                            id: z.string(),
                            userId: z.number(),
                            title: z.string(),
                            valueInCents: z.number(),
                            dueDate: z.string(),
                            paymentKey: z.string().nullish(),
                            isPaid: z.boolean(),
                            createdAt: z.date().nullish(),
                            updatedAt: z.date().nullish(),
                        })),
                    }),
                },
            },
        },
        async (req, res) => {
            const financialBills = await listAllFinancialBill()

            // Atualiza o cache em memória com as bills
            updateBillsCache(financialBills)

            const unpaidBillsAmount = financialBills.filter(bill => !bill.isPaid).length > 0
                ? financialBills
                    .filter(bill => !bill.isPaid)
                    .reduce((acc, bill) => acc + bill.valueInCents, 0)
                : 0

            return res.status(200).send({
                wallet: {
                    unpaidBillsAmount,
                },
                financialBills
            })
        }
    )
}