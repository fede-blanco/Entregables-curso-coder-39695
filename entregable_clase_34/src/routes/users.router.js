import { Router } from 'express'
import { getUsersController, registerUserController } from '../controllers/api/users.controller.js'
import { RoleAuth } from '../middlewares/soloLogueados.js'
import { autenticacionJwtView } from '../middlewares/passport.js'

export const usersRouter = Router()

usersRouter.post('/register',  registerUserController)
usersRouter.get('/', autenticacionJwtView, RoleAuth("admin"), getUsersController)

