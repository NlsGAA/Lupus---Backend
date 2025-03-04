import { sql } from "drizzle-orm"
import { db } from "../drizzle/client"
import { user as userSchema } from "../drizzle/schema/user"

export async function findUserByEmail(email: string) {
    const user = await db
        .select()
        .from(userSchema)
        .where(sql`${userSchema.email} = ${email}`)

    return {
        user
    }
}