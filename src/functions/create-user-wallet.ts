import { db } from "../drizzle/client";
import { userWallet as userWalletSchema } from "../drizzle/schema/user-wallet";

export async function createUserWallet(userId: number) {
    const defaultWalletValues = {
        userId: userId,
        balance_in_cents: 0,
        debt_in_cents: 0
    }

    const userWallet = await db
        .insert(userWalletSchema)
        .values(defaultWalletValues)
        .returning()

    const walletData = userWallet[0];

    return {
        walletId: walletData.id,
        balanceInCents: walletData.balance,
        debtInCents: walletData.debt
    }
}