import { Router } from "express";
import userModel from "../models/Users.model.js";

//creamos el router de sesiones
const sessionsRouter = Router()

async function registerController (req, res, next) {
  const { first_name, last_name, email, age, password } = req.body
  //Luego le vendria bien agregar una capa mas de seguridad con capa de "services" y manager
  const exists = await userModel.findOne({ email })
  if (exists) return res.status(400).send({ status: "error", error: "User already exists" })
  const user = {
      first_name,
      last_name,
      email,
      age,
      password //De momento no vamos a hashearlo, eso corresponde a la siguiente clase.
  }
  let result = await userModel.create(user)
  res.send({ status: "success", message: "User registered" })
}

async function loginController (req, res, next) {
  const { email, password } = req.body
  // console.log(" *****  Linea 25 sessions.router.js ***");
  // console.log(email, password);

  //Luego le vendria biena gregar una capa mas de seguridad con capa de "services" y manager
  const user = await userModel.findOne({ email, password }) //Ya que el password no está hasheado, podemos buscarlo directamente
  if (!user) return res.status(400).send({ status: "error", error: "Incorrect credentials" })

  //Si el email y la pass coinciden con los indicados se crea una propiedad con valor "admin", sino se crea con valor "user"
  if(email === "adminCoder@coder.com" && password === "adminCod3r123"){
    req.session.user = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      rol: "admin"
    }
  } else {
    req.session.user = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      rol: "user"
    }
  }

  res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" })
}

async function logoutController (req, res, next) {
  //Luego le vendria biena gregar una capa mas de seguridad con capa de "services" y manager
  req.session.destroy(err => {
    if (err) return res.status(500).send({ status: "error", error: "Couldn't logout" })
    res.redirect('/login') 
})
}

sessionsRouter.post('/register', registerController)

sessionsRouter.post('/login', loginController)

sessionsRouter.get('/logout', logoutController)

export default sessionsRouter;