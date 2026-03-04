import { Elysia } from "elysia";
import { user_plugin } from "./routes/user/user_plugins";

const Server = new Elysia()
    .use(user_plugin)
    .get("/bahh", () =>{console.log("")})
    .listen(3333);


console.log("FIC_SIDE rodando");