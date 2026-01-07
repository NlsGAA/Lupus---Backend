
import { z } from 'zod'
import { getBillInfo } from '../functions/get-bill-info'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const getBillInfoRoute: FastifyPluginAsyncZod = async app => {
    app.get(
        '/financial-bill/get/:billId',
        {
            schema: {
                summary: 'Get info about a specific bill',
                tags: ['financial-bill'],
                params: z.object({
                    billId: z.string(),
                }),
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
        async (req, _) => {
            const { billId } = req.params

            const bill = await getBillInfo(billId)

            return bill
        }
    )
}