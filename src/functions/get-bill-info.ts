import { sql } from "drizzle-orm"
import { db } from "../drizzle/client"
import { financialBills } from "../drizzle/schema/financial_bills"

export async function getBillInfo(billId: string){
    const financialBillInfo = await db
        .select()
        .from(financialBills)
        .where(sql`${financialBills.id} = ${billId}`)

    return financialBillInfo
}