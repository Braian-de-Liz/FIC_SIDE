import { Elysia, t } from "elysia";
import { dbModel } from '../../lib/drizzle_plugin';

const Load_user = new Elysia()
    .use(dbModel)
    .get("/user/:id", async ({ params, set, db }) => {

        const { id } = params;


    },
        {
            params: t.Object({
                id: t.Numeric()
            })
        });

export { Load_user };