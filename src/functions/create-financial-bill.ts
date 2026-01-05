import { db } from "../drizzle/client"
import { financialBills } from "../drizzle/schema/financial_bills"

interface CreateFinancialBillParams {
    userId: number
    title: string
    value: number
    dueDate: string
    paymentKey: string | null
    isPaid: boolean
}

export async function createFinancialBill({
    userId,
    title,
    value: valueInCents,
    dueDate,
    paymentKey,
    isPaid,
}: CreateFinancialBillParams) {
    const result = await db
        .insert(financialBills)
        .values({
           userId,
           title,
           valueInCents,
           dueDate,
           paymentKey,
           isPaid,
        })
        .returning()

    const financialBill = result[0]

    return {
        financialBillId: financialBill.id,
    }
}