import { db } from "../drizzle/client"
import { financialBills } from "../drizzle/schema/financial_bills"

export async function listAllFinancialBill(){
    const allFinancialBills = await db
        .select()
        .from(financialBills)
        .orderBy(
            financialBills.isPaid,
            financialBills.dueDate,
            financialBills.title
        )

    return allFinancialBills
}