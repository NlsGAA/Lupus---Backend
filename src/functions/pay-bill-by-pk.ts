import { db } from "../drizzle/client"
import { sql } from "drizzle-orm"
import { financialBills } from "../drizzle/schema/financial_bills"

interface PayBillByPkProps {
    id: string,
}

export async function payBillByPk(payload: PayBillByPkProps) {
    const financialBill = await db
        .update(financialBills)
        .set({
            isPaid: true,
        })
        .where(sql`${financialBills.id} = ${payload.id}`)
        .returning()

    return financialBill[0]
}