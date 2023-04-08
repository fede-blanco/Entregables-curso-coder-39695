import { usersService } from "../../services/users.service.js"
import { createHash } from "../../utils.js"


export async function registerUserController (req, res, next) {
  const { first_name, last_name, email, age, password } = req.body
  //Luego le vendria bien agregar una capa mas de seguridad con capa de "services" y manager
  const exists = await usersService.getUserByEmail(email )
  if (exists) return res.status(400).send({ status: "error", error: "User already exists" }).redirect("/login")
  const user = {
      first_name,
      last_name,
      email,
      age,
      password: createHash(password)
  }
  let result = await usersService.addUser(user)

    //   // funcion de passport para que el registro ya me deje logueado tambien!
    //   req.login(user, error => {
    //     if (error) {
    //         next(new Error('falló el login!'))
    //     } else {
    //         res.status(201).json(req.user)
    //     }
    // })

    


  res.send({ status: "success", message: "User registered" })
}

export async function getUsersController(req, res, next) {
  const users = await usersService.getUsers()
  res.json(users)
}