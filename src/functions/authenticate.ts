import { compare } from "bcryptjs"
import { findUserByEmail } from "./find-user-by-email"

interface AuthenticateUserProps {
    email: string
    password: string
}

export async function authenticateUser({ email, password }: AuthenticateUserProps) {
    const { user } = await findUserByEmail(email)

    if(!user) {
        throw new Error('Invalid credentials.')
    }

    const userData = user[0]

    console.log(user)

    const passwordMatch = await compare(password, userData.password)

    if(!passwordMatch) {
        throw new Error('Invalid credentials.')
    }

    return userData
}