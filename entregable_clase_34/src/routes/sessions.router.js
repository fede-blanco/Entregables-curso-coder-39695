import { Router } from "express";
import { getCurrentSessionController, loginController, logoutController} from "../controllers/api/sessions.controller.js";
import { soloLogueadosApi } from "../middlewares/soloLogueados.js";
import { registerUserController } from "../controllers/api/users.controller.js";
import { antenticacionPorGithub_CB, autenticacionJwtAlreadyLogged, autenticacionJwtApi, autenticacionPorGithub, autenticacionUserPass } from "../middlewares/passport.js";
import { encriptarJWT } from "../utils.js";
import { autenticacionJwtView } from "../middlewares/passport.js";

//creamos el router de sesiones
const sessionsRouter = Router()

// sessionsRouter.post('/register', registerUserController)

sessionsRouter.post('/login', autenticacionUserPass, loginController)

sessionsRouter.get('/logout', logoutController)

// datos de sesion, para testear!
sessionsRouter.get('/current', autenticacionJwtApi, getCurrentSessionController)

// login con github
//Se agregan las dos rutas que pide github y passport
sessionsRouter.get('/github', autenticacionPorGithub) // --> url a la cual se va a acceder desde el cliente (a la que redirigirá el boton que haya en la vista)
sessionsRouter.get('/githubcallback', antenticacionPorGithub_CB, (req, res, next) => {
      //Es importante que la guardemos con el mismo nombre (jwt_authorization) que despues la vamos a buscar
      res.cookie('jwt_authorization', encriptarJWT(req.user), {
        signed: true,
        httpOnly: true
      }) //TODO
  
      res.status(201)
      // .json(req.user) // --> No puedo enviar las 2 respuestas a la vez

      res.redirect('/products') // --> No puedo enviar las 2 respuestas a la vez
  })

export default sessionsRouter;