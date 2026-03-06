// types.d.ts
import { db } from "./src/lib/drizzle_plugin";

declare global {
  namespace Elysia {
    interface Context {
      db: typeof db;
    }
  }
}