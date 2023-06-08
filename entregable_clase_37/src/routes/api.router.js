import { Router } from 'express'
import { usersRouter } from './users.router.js'
import sessionsRouter from './sessions.router.js'

export const apiRouter = Router()

//Dentro del api router (que va a ser como la ruta principal hacia los recursos de la api) vamos a anidar el router para usuarios y para sesiones, los cuales cada uno van a tener sus endpoints
apiRouter.use('/users', usersRouter)
apiRouter.use('/sessions', sessionsRouter)

