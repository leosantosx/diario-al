import { Router } from 'express'
import newsRoutes from './news.routes'
import sessionsRouter from './sessions.routes'

const routes = Router()

routes.use('/news', newsRoutes)
routes.use('/sessions', sessionsRouter)

export default routes