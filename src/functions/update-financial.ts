import { db } from "../drizzle/client"
import { sql } from "drizzle-orm"
import { financialBills } from "../drizzle/schema/financial_bills"

interface UpdateFinancialBillProps {
    id: string,
    title: string,
    valueInCents: number,
    dueDate: string,
    paymentKey?: string | null,
    isPaid: boolean,
}

export async function updateFinancialBill(payload: UpdateFinancialBillProps) {
    const financialBill = await db
        .update(financialBills)
        .set({
            title: payload.title,
            valueInCents: payload.valueInCents,
            dueDate: payload.dueDate,
            paymentKey: payload.paymentKey,
            isPaid: payload.isPaid,
        })
        .where(sql`${financialBills.id} = ${payload.id}`)
        .returning()

    return financialBill[0]
}