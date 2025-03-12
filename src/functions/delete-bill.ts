import { sql } from "drizzle-orm"
import { db } from "../drizzle/client"
import { financialBills } from "../drizzle/schema/financial_bills"

export async function deleteBill(billId: string){
    await db
        .delete(financialBills)
        .where(sql`${financialBills.id} = ${billId}`)
}