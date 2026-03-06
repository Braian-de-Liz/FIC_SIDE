import { Elysia, t } from 'elysia';
import argon2 from 'argon2';
import { dbModel } from '../../lib/drizzle_plugin';
import { users } from '../../lib/schema';

const register = new Elysia()
    .use(dbModel)
    .post("/register", async ({ body, set, db }) => {
        const { nome, email, password } = body;

        try {
            const check_user = await db.query.users.findFirst({
                where: (users, { eq }) => eq(users.email, body.email)
            });

            if (check_user) {
                set.status = 400
                return {
                    status: 'erro',
                    message: 'usuário já existente'
                }
            }

            const password_true = await argon2.hash(password);

            await db.insert(users).values({
                name: nome,
                email: email,
                password: password_true
            })

            set.status = 201;
            return {
                status: 'sucesso',
                message: `Usuário ${nome} registrado`
            };
        }
        catch (erro) {
            set.status = 500;
            return {
                status: 'erro',
                message: 'erro interno no servidor'
            };
        }

    }, {
        body: t.Object({
            nome: t.String({ minLength: 3, maxLength: 87, error: 'todos os campos preemchidos' }),
            email: t.String({ minLength: 8, maxLength: 87, error: 'todos os campos preemchidos' }),
            password: t.String({ minLength: 8, error: "senha deve ter pelo menos 8 digitos" }),
        }),
        response: {
            201: t.Object({
                status: t.String(),
                message: t.String()
            }),
            400: t.Object({
                status: t.String(),
                message: t.String()
            }),
            500: t.Object({
                status: t.String(),
                message: t.String()
            })
        }
    });

export { register };