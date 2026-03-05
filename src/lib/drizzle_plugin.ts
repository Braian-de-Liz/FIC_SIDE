// src\lib\drizzle_plugin.ts
import { Elysia } from "elysia";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "./schema";

const queryClient = postgres(Bun.env.DATABASE_URL!);

export const db = drizzle(queryClient, { schema });

const dbModel = (app: Elysia) =>
    app
        .decorate('db', db)
        .onStop(async () => {
            await queryClient.end();
        });

export { dbModel };