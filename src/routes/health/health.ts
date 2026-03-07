import { Elysia, t } from 'elysia';

const health_route = new Elysia()
    .get("/health", ({ set }) => {
        return {
            status: "ok",
            timestamp: new Date().toISOString(),
            uptime: process.uptime() 
        };
    }, {
        response: {
            200: t.Object({
                status: t.String(),
                timestamp: t.String(),
                uptime: t.Number()
            })
        },
        detail: {
            summary: "Verifica a saúde e o tempo de atividade do servidor"
        }
    });

export { health_route };