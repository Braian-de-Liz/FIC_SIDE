import { Elysia } from "elysia";
import { register } from "./register";
import { Load_user } from "./load_user";
import { Login } from "./login_user";
import { dbModel } from "../../lib/drizzle_plugin";

const user_plugin = new Elysia({ prefix: '/api' })
    .use(dbModel)
    .use(register)
    .use(Login)
    .use(Load_user);


export { user_plugin };