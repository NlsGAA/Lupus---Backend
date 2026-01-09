import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { hash } from 'bcryptjs'
import { createUser } from '../functions/create-user'
import { findUserByEmail } from '../functions/find-user-by-email'
import { createUserWallet } from '../functions/create-user-wallet'

export const createUserRoute: FastifyPluginAsyncZod = async app => {
    app.post(
        '/user/create',
        {
            schema: {
                summary: 'Create a new user',
                tags: ['user'],
                body: z.object({
                    email: z.string().email(),
                    password: z.string().min(6),
                }),
                response: {
                    201: z.object({
                        userId: z.number(),
                        wallet: z.object({
                            walletId: z.number(),
                            balanceInCents: z.number(),
                            debtInCents: z.number(),
                        }),
                    }),
                },
            },
        },
        async (req, res) => {
            const { email, password } = req.body

            const { user } = await findUserByEmail(email)

            if (user.length > 0) {
                throw new Error('User already exists.')
            }

            const password_hash = await hash(password, 6)

            const { userId } = await createUser({ email, password: password_hash })

            const userWallet = await createUserWallet(userId)

            return res.status(201).send({
                userId,
                wallet: userWallet
            })
        }
    )
}