import { Router } from 'express'
import { getUsersController, registerUserController } from '../controllers/api/users.controller.js'
import { RoleAuth } from '../middlewares/soloLogueados.js'

export const usersRouter = Router()

usersRouter.post('/register', registerUserController)
usersRouter.get('/', RoleAuth("admin"), getUsersController)

