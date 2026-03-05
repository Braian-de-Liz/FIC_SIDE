import { Elysia, t } from 'elysia';

const register = new Elysia()
    .post("/register", async ({ body, set }) => {

        const { nome } = body;


    },
        {
            body: t.Object({
                nome: t.String({ minLength: 3, maxLength: 87, error: 'nome inválido ou não enviado' }),

            })
        })


export { register };