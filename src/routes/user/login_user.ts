import { dbModel } from "../../lib/drizzle_plugin";
import { Elysia, t } from "elysia";
import argon2 from "argon2";
import jwt from "@elysiajs/jwt";

const Login = new Elysia()
    .use(dbModel)
    .use(jwt({
        name: 'jwt',
        secret: Bun.env.JWT_SECRET || 'fallback_secret_muito_seguro'
    }))
    .post("/login", async ({ body, set, db, jwt }) => {
        const { email, password } = body;

        try {
            const usuario = await db.query.users.findFirst({
                where: (users, { eq }) => eq(users.email, email)
            });

            if (!usuario) {
                set.status = 404;
                return {
                    status: 'erro',
                    message: 'usuário não cadastrado',
                    token: '' 
                };
            }

            const pass_true = await argon2.verify(usuario.password, password);

            if (!pass_true) {
                set.status = 401;
                return { 
                    status: 'erro', 
                    message: 'senha incorreta',
                    token: '' 
                };
            }

            const token = await jwt.sign({
                sub: String(usuario.id),
                email: usuario.email
            });

            return {
                status: 'sucesso',
                message: 'login realizado com sucesso', 
                token: token
            };

        } catch (erro) {
            console.error(erro);
            set.status = 500;
            return { 
                status: 'erro', 
                message: 'erro interno no servidor',
                token: '' 
            };
        }

    }, {
        body: t.Object({
            email: t.String({ format: 'email' }),
            password: t.String()
        }),
        response: t.Object({
            status: t.String(),
            message: t.String(),
            token: t.String()
        })
    });

export { Login };