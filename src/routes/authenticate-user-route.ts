import { z } from 'zod'
import { authenticateUser } from '../functions/authenticate'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const authenticateUserRoute: FastifyPluginAsyncZod = async app => {
    app.post(
        '/user/authenticate',
        {
            schema: {
                summary: 'Autenticação de usuário',
                tags: ['user'],
                body: z.object({
                    email: z.string().email(),
                    password: z.string(),
                }),
                response: {
                    201: z.object({
                        userData: z.object({
                            id: z.number(),
                            email: z.string(),
                            password: z.string(),
                        }),
                    }),
                },
            },
        },
        async (req, res) => {
            const { email, password } = req.body

            const user = await authenticateUser({ email, password })

            return res.status(201).send({
                userData: user
            })
        }
    )    
}