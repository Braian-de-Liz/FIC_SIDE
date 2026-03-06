import { Elysia, t } from 'elysia';
import argon2 from 'argon2';
import { dbModel } from '../../lib/drizzle_plugin';

const register = new Elysia()
    .use(dbModel)
    .post("/register", async ({ body, set, db }) => {
        const { nome, email, password } = body;


        return { message: `Usuário ${nome} registrado` };
    }, {
        body: t.Object({
            nome: t.String({ minLength: 3, maxLength: 87 }),
            email: t.String({ minLength: 8, maxLength: 87 }),
            password: t.String({ minLength: 8, error: "senha deve ter pelo menos 8 digitos" }),
        })
    });

export { register };