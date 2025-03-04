import { pgTable, varchar, timestamp, serial, numeric } from "drizzle-orm/pg-core"

export const userWallet = pgTable('user_wallet', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id').notNull(),
    balance: numeric('balance').default('0').notNull(),
    debt: numeric('debt').default('0').notNull(),
    totalAmount: numeric('total_amount').default('0').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
})