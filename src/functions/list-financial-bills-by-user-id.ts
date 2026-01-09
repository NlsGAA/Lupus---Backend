import { sql } from "drizzle-orm"
import { db } from "../drizzle/client"
import { financialBills } from "../drizzle/schema/financial_bills"

export async function listFinancialBillsByUserId(userId: number) {
    const userBills = await db
        .select()
        .from(financialBills)
        .where(sql`${financialBills.userId} = ${userId}`)

    return userBills
}
