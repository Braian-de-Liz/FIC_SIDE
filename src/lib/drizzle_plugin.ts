// src/lib/drizzle_plugin.ts
import { Elysia } from "elysia";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "./schema";

const queryClient = postgres(Bun.env.DATABASE_URL!);

const db = drizzle(queryClient, { schema });

const dbModel = (app: Elysia) =>
    app.decorate('db', db).onStop(async () => {
        console.log("Encerrando conexão com o banco...");
        await queryClient.end();
    });


export { db, dbModel };