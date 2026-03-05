import { Elysia, t } from "elysia";

const Load_user = new Elysia()
    .get("/user/:id", async ({ params, set }) => {

        const { id } = params;


    },
        {
            params: t.Object({
                id: t.Numeric()
            })
        });

export { Load_user };