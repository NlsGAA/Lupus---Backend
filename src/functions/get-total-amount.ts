import { sql } from "drizzle-orm"
import { db } from "../drizzle/client"
import { financialBills } from "../drizzle/schema/financial_bills"

export async function getTotalAmount(){
    const walletAmount = await db
        .select({ debt_in_cents: financialBills.valueInCents })
        .from(financialBills)
        .where(sql`${financialBills.isPaid} = false`)

    return walletAmount
}