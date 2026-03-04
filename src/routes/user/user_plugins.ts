import { Elysia } from "elysia";
import { register } from "./register";


const user_plugin = new Elysia().use(register);


export { user_plugin };