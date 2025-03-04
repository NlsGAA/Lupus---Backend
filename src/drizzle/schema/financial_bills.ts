import { uuid, pgTable, varchar, boolean, timestamp } from "drizzle-orm/pg-core"

export const financialBills = pgTable('financial_bills', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar('title', { length: 150 }).notNull(),
    value: varchar('value').default('0').notNull(),
    dueDate: varchar('due_date').notNull(),
    paymentKey: varchar('payment_key', { length: 150 }),
    paid: boolean('paid').default(false).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
})