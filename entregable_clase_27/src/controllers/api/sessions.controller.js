import { usersService } from "../../services/users.service.js"
import { encriptarJWT } from "../../utils.js"


export async function loginController (req, res, next) {

      // Para no perder la info de ese usuario (al ya no guardarse en ninguna session en el servidor) se encripta y se envia en una cookie
      //Es importante que la guardemos con el mismo nombre (jwt_authorization) que despues la vamos a buscar
      res.cookie('jwt_authorization', encriptarJWT(req.user), {
        signed: true,
        httpOnly: true
      }) //TODO
  
      res.status(201).json(req.user) //TODO

  // res.status(201).json(req.session.passport.user) //--> Lo comentamos porque ya no utilizamos session
  // next()
}

export async function logoutController (req, res, next) {

  res.clearCookie('jwt_authorization', {
    signed: true,
    httpOnly: true
  }) //TODO es necesario incluir las mismas opciones!
  res.sendStatus(200)


  //lo comento poque ya no utilizamos mas sessions sino JWT
  // req.session.destroy(err => {
  //   if (err) return res.status(500).send({ status: "error", error: "Couldn't logout" })
  //   res.redirect('/login') 
  // })

  // // reemplazado por atajo que provee passport
  // req.logout(err => {
  //   res.sendStatus(200)
  // })
}

export function getCurrentSessionController(req, res, next) {
  // passport guarda la sesion directamente en ** req.user ** en lugar del campo session de la peticion !
  res.json(req.user)
}