import { Elysia } from "elysia";
import { register } from "./register";
import { Load_user } from "./load_user";
import { dbModel } from "../../lib/drizzle_plugin";

const user_plugin = new Elysia().use(dbModel).use(register).use(Load_user);


export { user_plugin };