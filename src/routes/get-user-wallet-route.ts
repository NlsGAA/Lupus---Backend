import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { findUserWalletByUserId } from '../functions/find-user-wallet-by-user-id'
import { getBillsFromCache } from '../lib/bills-cache'

export const getUserWalletRoute: FastifyPluginAsyncZod = async app => {
    app.get(
        '/user/wallet/:userId',
        {
            schema: {
                summary: 'Get user wallet information with unpaid bills calculated in real-time',
                tags: ['user-wallet'],
                params: z.object({
                    userId: z.coerce.number(),
                }),
                response: {
                    200: z.object({
                        wallet: z.object({
                            // balanceInCents: z.number(),
                            // debtInCents: z.number(),
                            unpaidBillsAmount: z.number(),
                        }),
                        unpaidBillsCount: z.number(),
                    }),
                },
            },
        },
        async (req, res) => {
            const { userId } = req.params

            const userBills = getBillsFromCache(userId)

            const unpaidBills = userBills.filter(bill => !bill.isPaid)

            const unpaidBillsAmount = unpaidBills.length > 0
                ? unpaidBills.reduce((acc, bill) => acc + bill.valueInCents, 0)
                : 0

            return res.status(200).send({
                wallet: {
                    unpaidBillsAmount,
                },
                unpaidBillsCount: unpaidBills.length,
            })
        }
    )
}
