import { sql } from "drizzle-orm"
import { db } from "../drizzle/client"
import { userWallet as userWalletSchema } from "../drizzle/schema/user-wallet"

export async function findUserWalletByUserId(userId: number) {
    const userWallet = await db
        .select()
        .from(userWalletSchema)
        .where(sql`${userWalletSchema.userId} = ${userId}`)

    return {
        userWallet
    }
}