import { user } from "./user"
import { pgTable, varchar, timestamp, serial, numeric, integer } from "drizzle-orm/pg-core"

export const userWallet = pgTable('user_wallet', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => user.id).notNull(),
    balance: integer('balance_in_cents').default(0).notNull(),
    debt: integer('debt_in_cents').default(0).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
})