// src\lib\drizzle_plugin.ts
import { Elysia } from "elysia";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "./schema";

const queryClient = postgres(Bun.env.DATABASE_URL!);

export const db = drizzle(queryClient, { schema });

const dbModel = new Elysia({ name: 'db-model' })
    .decorate('db', db)
    .onStop(async () => {
        queryClient.end();
    });

export { dbModel };