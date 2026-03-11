import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { swaggerUI } from '@hono/swagger-ui'

const app = new Hono()


export default {
  port: 3334,
  fetch: app.fetch
}