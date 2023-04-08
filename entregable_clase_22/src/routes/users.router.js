import { Router } from 'express'
import { getUsersController, registerUserController } from '../controllers/api/users.controller.js'

export const usersRouter = Router()

usersRouter.post('/register', registerUserController)
usersRouter.get('/', getUsersController)

