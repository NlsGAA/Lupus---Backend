
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getTotalAmount } from '../functions/get-total-amount'

export const getTotalAmountRoute: FastifyPluginAsyncZod = async app => {
    app.get(
        '/wallet/amount',
        {
            schema: {
                summary: 'Get total amount of bills',
                tags: ['wallet'],
                response: {
                    200: z.object({
                        walletAmount: z.array(z.object({
                            // balance: z.string(),
                            debt_in_cents: z.number(),
                            // totalAmount: z.string(),
                        })),
                    }),
                },
            },
        },
        async (req, res) => {
            const walletAmount = await getTotalAmount()

            return res.status(200).send({
                walletAmount
            })
        }
    )
}