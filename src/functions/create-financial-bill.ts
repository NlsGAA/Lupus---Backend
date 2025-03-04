import { db } from "../drizzle/client"
import { financialBills } from "../drizzle/schema/financial_bills"

interface CreateFinancialBillParams {
    title: string
    value: string
    dueDate: string
    paymentKey: string | null
    paid: boolean
}

export async function createFinancialBill({
    title,
    value,
    dueDate,
    paymentKey,
    paid,
}: CreateFinancialBillParams) {
    const result = await db
        .insert(financialBills)
        .values({
           title,
           value,
           dueDate,
           paymentKey,
           paid,
        })
        .returning()

    const financialBill = result[0]

    return {
        financialBillId: financialBill.id,
    }
}