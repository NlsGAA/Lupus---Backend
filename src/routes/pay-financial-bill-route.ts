import { z } from 'zod'
import { payBillByPk } from '../functions/pay-bill-by-pk'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const payFinancialBillRoute: FastifyPluginAsyncZod = async app => {
    app.post(
        '/financial/:id/pay',
        {
            schema: {
                summary: 'Pay a specific bill',
                tags: ['financial-bill'],
                response: {
                    200: z.object({
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
                },
            },
        },
        async (req, res) => {
            const { id } = req.params as { id: string }

            const billPaid = await payBillByPk({ id })

            return res.status(201).send(billPaid)
        }
    )
}