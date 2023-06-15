import { User } from "../../models/User.js"
import { cartsService } from "../../services/carts.service.js"
import { emailService } from "../../services/email.service.js"
import { usersService } from "../../services/users.service.js"
import { createHash, encriptarJWT } from "../../utils.js"


export async function registerUserController (req, res, next) {
    const { first_name, last_name, email, age, password, role = "user" } = req.body
    //Luego le vendria bien agregar una capa mas de seguridad con capa de "services" y manager
    const exists = await usersService.getUserByEmail(email)

    if (exists) return res.status(400).send({ status: "error", error: "User already exists" }).redirect("/login")

    //Si el email y la pass coinciden con los indicados se crea una propiedad con valor "admin", sino se crea con valor "user"
    let userRole;
    if(email === "adminCoder@coder.com" && password === "adminCod3r123"){
      userRole = "admin"
    } else {
      userRole = "user"
    }

    const user = new User({
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
        role: userRole,
    })

    

    let addedUser = await usersService.addUser(user)
    // console.log("****** linea 35 - users.controller.js ******");
    // console.log(addedUser);
    // console.log(addedUser._id);
    // console.log("****** linea 37 - users.controller.js ******");

    let createUserCart = await cartsService.addCart(addedUser._id)

    let savedUserCart = await cartsService.getCartByOwnerId(addedUser._id)

    // console.log("****** linea 44 - users.controller.js ******");
    // console.log(createUserCart);
    // console.log("****** linea 46 - users.controller.js ******");
    // console.log(savedUserCart);
    // console.log("****** linea 48 - users.controller.js ******");

    //Es importante que la guardemos con el mismo nombre (jwt_authorization) que despues la vamos a buscar
    res.cookie('jwt_authorization', encriptarJWT(addedUser), {
      signed: true,
      httpOnly: true
    }) //TODO

    let emailSended = await emailService.send({receiver: addedUser.email, message: `Hola ${first_name} ${last_name}!! \n\nBienvenido a la aplicación de federico Blanco!! \n\nEste mail es solo una notificación de que el usuario con el mail ${email} se registró exitosamente.`})

    res.status(201).json(addedUser) //TODO
}

export async function getUsersController(req, res, next) {
  const users = await usersService.getUsers()
  
  res.json(users)
}

export async function getPremiumUserController(req, res, next){
    const userId = req.params.uid
    // console.log(userId);
    const user = await usersService.getUserById(userId)
    console.log("********* linea 55 user.controller.js ******");
    console.log(user);
    if (user.role == "user")    {
        user.role = "premium"
    } else if (user.role == "premium") {
        user.role = "user"
    }
    console.log("********* linea 62 user.controller.js ******");
    console.log(user);
    
    await usersService.updateUserById(userId, user)
    console.log("********* linea 66 user.controller.js ******");

    res.json(user)
}


  //Funcion que Controla la acción de la url (GET) "/resetPassword" 
  export async function resetPasswordController(req, res,next){

        const userEmail = req.body.email;
        // console.log("**** linea 92 ---  users.controller.js --  resetPasswordController");
        // console.log(userEmail);
        // console.log("**** linea 94 ---  users.controller.js --  resetPasswordController");
        const user = await usersService.getUserByEmail(userEmail)
        // console.log("**** linea 96 ---  users.controller.js --  resetPasswordController");
        // console.log(user);
        // console.log("**** linea 98 ---  users.controller.js --  resetPasswordController");
        const userId = user._id
        // console.log("**** linea 100 ---  users.controller.js --  resetPasswordController");
        // console.log(userId);
        // console.log("**** linea 102 ---  users.controller.js --  resetPasswordController");
        
        const resetTokenObtained = await usersService.obtainTokenForPassUpdate(userId)
        
        // console.log("**** linea 106 ---  users.controller.js --  resetPasswordController");
        // console.log(resetTokenObtained);
        // console.log("**** linea 108 ---  users.controller.js --  resetPasswordController");

        return resetTokenObtained;
}

export async function resetPasswordconfirmController(req,res,next){

    const token = req.query.token;
    const password = req.body.password;
    const email = req.query.email;

    // console.log("**** linea 119 ---  users.controller.js --  resetPasswordconfirmController");
    // console.log("token ---> ", token);
    // console.log("**** linea 121 ---  users.controller.js --  resetPasswordconfirmController");
    // console.log("password ---> ", password);
    // console.log("**** linea 123 ---  users.controller.js --  resetPasswordconfirmController");
    // console.log("email ---> ", email);
    // console.log("**** linea 125 ---  users.controller.js --  resetPasswordconfirmController");

    const user = await usersService.getUserByEmail(email)
    const userId = user._id

    // console.log("**** linea 130 ---  users.controller.js --  resetPasswordconfirmController");
    // console.log("user ---> ", user);
    // console.log("**** linea 132 ---  users.controller.js --  resetPasswordconfirmController");
    // console.log("userId ---> ", userId);
    // console.log("**** linea 134 ---  users.controller.js --  resetPasswordconfirmController");

    const userWithUpdatedPassword = await usersService.updateUserPassword(userId,password, token)

    // console.log("**** linea 138 ---  users.controller.js --  resetPasswordconfirmController");
    // console.log("userWithUpdatedPassword ---> ", userWithUpdatedPassword);
    // console.log("**** linea 140 ---  users.controller.js --  resetPasswordconfirmController");

    // redirije a login para volver a ingresar a la aplicacion
    return res.status(201).json(userWithUpdatedPassword)
}