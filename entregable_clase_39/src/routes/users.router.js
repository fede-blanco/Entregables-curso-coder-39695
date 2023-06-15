import { Router } from 'express'
import { getUsersController, registerUserController, getPremiumUserController, resetPasswordController, resetPasswordconfirmController } from '../controllers/api/users.controller.js'
import { RoleAuth } from '../middlewares/soloLogueados.js'
import { autenticacionJwtApi, autenticacionJwtView } from '../middlewares/passport.js'

export const usersRouter = Router()



usersRouter.post('/register',  registerUserController)
usersRouter.post('/resetPassword', resetPasswordController)
usersRouter.post('/resetPasswordConfirm', resetPasswordconfirmController)
usersRouter.get("/premium/:uid",autenticacionJwtApi, getPremiumUserController)
usersRouter.get('/', autenticacionJwtView, RoleAuth("admin"), getUsersController)
