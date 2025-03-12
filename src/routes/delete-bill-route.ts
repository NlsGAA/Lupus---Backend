
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { deleteBill } from '../functions/delete-bill'

export const deleteBillRoute: FastifyPluginAsyncZod = async app => {
    app.delete(
        '/financial-bill/delete/:billId',
        {
            schema: {
                summary: 'Delete a specific bill',
                tags: ['financial-bill'],
                params: z.object({
                    billId: z.string(),
                }),
                response: {},
            },
        },
        async (req, res) => {
            const billId = req.params.billId

            await deleteBill(billId)

            return res.status(204).send({})
        }
    )    
}