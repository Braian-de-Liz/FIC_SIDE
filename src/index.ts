import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger"

import { dbModel } from "./lib/drizzle_plugin";
import { health_route } from "./routes/health/health"
import { user_plugin } from "./routes/user/user_plugins";

const Server = new Elysia()
    .use(dbModel)
    .use(user_plugin)
    .use(health_route)
    .use(swagger())
    .listen(3334);


console.log("FIC_SIDE rodando na porta 3334");