
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getBillInfo } from '../functions/get-bill-info'

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
                        bill: z.array(z.object({
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
        async res => {
            const { billId } = res.params

            const bill = await getBillInfo(billId)

            return { bill }
        }
    )    
}