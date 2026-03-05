import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger"

import { dbModel } from "./lib/drizzle_plugin";
import { Load_user } from "./routes/user/load_user";
import { register } from "./routes/user/register"

const Server = new Elysia()
    .use(dbModel)
    .use(Load_user)
    .use(register)
    .get("/bahh", () => { console.log("Des faz o L") })
    .use(swagger())
    .listen(3333);


console.log("FIC_SIDE rodando");