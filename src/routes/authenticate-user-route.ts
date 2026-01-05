import { z } from 'zod'
import { authenticateUser } from '../functions/authenticate'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const authenticateUserRoute: FastifyPluginAsyncZod = async app => {
    app.post(
        '/user/authenticate',
        {
            schema: {
                summary: 'Authenticate an user',
                tags: ['user'],
                body: z.object({
                    email: z.string().email(),
                    password: z.string(),
                }),
                response: {
                    201: z.object({
                        id: z.number(),
                        email: z.string(),
                        wallet: z.object({
                            balanceInCents: z.number(),
                            debtInCents: z.number(),
                        }),
                    }),
                },
            },
        },
        async (req, res) => {
            const { email, password } = req.body

            const user = await authenticateUser({ email, password })

            return res.status(201).send(user)
        }
    )
}