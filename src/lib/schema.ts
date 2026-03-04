import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

const users = pgTable('users', {
    id: serial().primaryKey().unique(),
    nome: varchar()
})

export { users };