import { usersService } from "../../services/users.service.js"


export async function loginController (req, res, next) {

  res.status(201).json(req.session.passport.user)
  // next()
}

export async function logoutController (req, res, next) {
  req.session.destroy(err => {
    if (err) return res.status(500).send({ status: "error", error: "Couldn't logout" })
    res.redirect('/login') 
  })

  // // reemplazado por atajo que provee passport
  // req.logout(err => {
  //   res.sendStatus(200)
  // })
}

export function getCurrentSessionController(req, res, next) {
  // passport guarda la sesion directamente en ** req.user ** en lugar del campo session de la peticion !
  res.json(req.user)
}