import { compare } from "bcryptjs"
import { findUserByEmail } from "./find-user-by-email"
import { findUserWalletByUserId } from "./find-user-wallet-by-user-id"

interface AuthenticateUserProps {
    email: string
    password: string
}

interface userWallet {
    balanceInCents: number
    debtInCents: number
}

interface AuthenticateUserReturn {
    id: number
    email: string
    wallet: userWallet
}

export async function authenticateUser({ email, password }: AuthenticateUserProps): Promise<AuthenticateUserReturn> {
    const { user } = await findUserByEmail(email)

    if(!user) {
        throw new Error('Invalid credentials.')
    }

    const userData = user[0]

    const passwordMatch = await compare(password, userData.password)

    if(!passwordMatch) {
        throw new Error('Invalid credentials.')
    }

    const userWallet = await getUserWallet(userData.id)

    const resposne = {
        id: userData.id,
        email: userData.email,
        wallet: userWallet
    }

    return resposne
}

async function getUserWallet(userId: number): Promise<userWallet> {
    const userWallet = await findUserWalletByUserId(userId)

    const wallet = userWallet.userWallet[0]

    return {
        balanceInCents: wallet.balance,
        debtInCents: wallet.debt
    }
}