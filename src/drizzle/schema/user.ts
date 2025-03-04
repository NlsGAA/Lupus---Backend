import { uuid, pgTable, varchar, boolean, timestamp, primaryKey, serial, numeric } from "drizzle-orm/pg-core"

export const user = pgTable('user', {
    id: serial('id').primaryKey(),
    email: varchar('email').unique().notNull(),
    password: varchar('password').notNull(),
})