import { Elysia, t } from 'elysia';

const register = new Elysia().post("/register", async ({ body, set }) => {
    const { nome } = body;



    return { message: `Usuário ${nome} registrado` };
}, {
    body: t.Object({
        nome: t.String({ minLength: 3, maxLength: 87 }),
    })
});

export { register };