import { user } from "./user"
import { uuid, pgTable, varchar, boolean, timestamp, integer } from "drizzle-orm/pg-core"

export const financialBills = pgTable('financial_bills', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: integer('user_id').references(() => user.id).notNull(),
    title: varchar('title', { length: 150 }).notNull(),
    valueInCents: integer('value').notNull(),
    dueDate: varchar('due_date').notNull(),
    paymentKey: varchar('payment_key', { length: 150 }),
    isPaid: boolean('is_paid').default(false).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
})