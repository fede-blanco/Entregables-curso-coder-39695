import { User } from "../../models/User.js"
import { usersService } from "../../services/users.service.js"
import { createHash, encriptarJWT } from "../../utils.js"


export async function registerUserController (req, res, next) {
    const { first_name, last_name, email, age, password } = req.body
    //Luego le vendria bien agregar una capa mas de seguridad con capa de "services" y manager
    const exists = await usersService.getUserByEmail(email )

    if (exists) return res.status(400).send({ status: "error", error: "User already exists" }).redirect("/login")

    const user = new User({
        first_name,
        last_name,
        email,
        age,
        password: createHash(password)
    })

    
    //Si el email y la pass coinciden con los indicados se crea una propiedad con valor "admin", sino se crea con valor "user"
    if(email === "adminCoder@coder.com" && password === "adminCod3r123"){
      user["rol"] = "admin"
    } else {
      user["rol"] = "user"
    }

    let result = await usersService.addUser(user)

    //Es importante que la guardemos con el mismo nombre (jwt_authorization) que despues la vamos a buscar
    res.cookie('jwt_authorization', encriptarJWT(user), {
      signed: true,
      httpOnly: true
    }) //TODO

    res.status(201).json(user) //TODO
}

export async function getUsersController(req, res, next) {
  const users = await usersService.getUsers()
  res.json(users)
}