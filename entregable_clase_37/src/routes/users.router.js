import { Router } from 'express'
import { getUsersController, registerUserController, getPremiumUserController } from '../controllers/api/users.controller.js'
import { RoleAuth } from '../middlewares/soloLogueados.js'
import { autenticacionJwtApi, autenticacionJwtView } from '../middlewares/passport.js'

export const usersRouter = Router()

usersRouter.post('/register',  registerUserController)
usersRouter.get("/premium/:uid",autenticacionJwtApi, getPremiumUserController)
usersRouter.get('/', autenticacionJwtView, RoleAuth("admin"), getUsersController)
