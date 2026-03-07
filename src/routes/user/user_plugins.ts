import { Elysia } from "elysia";
import { register } from "./register";
import { Load_user } from "./load_user";
import { Login } from "./login_user";

const user_plugin = new Elysia()
    .use(register)
    .use(Login)
    .use(Load_user);


export { user_plugin };