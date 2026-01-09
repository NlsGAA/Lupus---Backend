import { db } from "../drizzle/client"
import { user as userSchema } from "../drizzle/schema/user"

interface CreateUserProps {
    email: string
    password: string
}

export async function createUser(data: CreateUserProps) {
    const user = await db
        .insert(userSchema)
        .values(data)
        .returning()

    const userData = user[0]

    return {
        userId: userData.id
    }
}