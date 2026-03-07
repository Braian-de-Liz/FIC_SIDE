import { Elysia, t } from "elysia";
import { dbModel } from '../../lib/drizzle_plugin';

const Load_user = new Elysia()
    .use(dbModel)
    .get("/user/:id", async ({ params, set, db }) => {

        const { id } = params;

        try {

            const search_user = await db.query.users.findFirst({ where: (users, { eq }) => eq(users.id, params.id) });

            if (!search_user) {
                set.status = 404
                return {
                    status: 'erro',
                    message: 'usuário não existente'
                }
            }


            const { password: _, ...user_data } = search_user;

            set.status = 200;
            return {
                status: 'sucesso',
                data: user_data
            };

        }

        catch (erro) {
            console.warn(erro);

            set.status = 500;
            return {
                status: 'erro',
                message: 'erro interno no servidor'
            };
        }
    },
        {
            params: t.Object({
                id: t.Numeric()
            }),

            response: {
                200: t.Object({
                    status: t.String(),
                    data: t.Object({
                        id: t.Number(),
                        name: t.String(),
                        email: t.String(),
                        createdAt: t.Date()
                    })
                }),
                404: t.Object({
                    status: t.String(),
                    message: t.String()
                }),
                500: t.Object({
                    status: t.String(),
                    message: t.String()
                })
            }
        });

export { Load_user };