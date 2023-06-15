import { userManager } from "../managers/UserManager.js";
import { winstonLogger } from "../middlewares/winstonLogger.js";
import ResetToken from "../models/ResetToken.js";
import { resetTokensRepository } from "../repositories/resetTokens.repository.js";
import { usersRepository } from "../repositories/users.repository.js";
import { createHash, desencriptarJWT, encriptarJWT,  isValidHash } from "../utils.js";
import { emailService } from "./email.service.js";

class UserService {


    async addUser(user){
      try {
        // await userManager.addUser(user);
        let usercreated = await usersRepository.addUser(user);
        winstonLogger.info(`Usuario creado -- - ${new Date().toLocaleTimeString()}`)
        return usercreated
      } catch (error) {
        winstonLogger.error(`Error en assUser - user.service.js --> ${error}`)
        throw new Error(`Error en assUser - user.service.js --> ${error}`)
      }
    }
    
    
    async getUserByEmail(email){
      try {
        // return await userManager.getUserByEmail(email);
        return await usersRepository.getUserByEmail(email);
      } catch (error) {
        winstonLogger.error(`Error en getUserByEmail - user.service.js --> ${error}`)
        throw new Error(`Error en getUserByEmail - user.service.js --> ${error}`)
      }
    }
    async getUserById(userId){
      try {
        // return await userManager.getUserByEmail(email);
        // console.log("****** linea 33 -- users.service.js");
        // console.log("userId -->", userId);
        // console.log("****** linea 35 -- users.service.js");
        const user = await usersRepository.getUserById(userId);
        // console.log("****** linea 37 -- users.service.js");
        // console.log("user -->", user);
        // console.log("****** linea 39 -- users.service.js");
        return user
      } catch (error) {
        winstonLogger.error(`Error en getUserById - user.service.js --> ${error}`)
        throw new Error(`Error en getUserById - user.service.js --> ${error}`)
      }
    }
    
    async getUsers(){
      try {
        // return await userManager.getUsers();
        return await usersRepository.getUsers();
      } catch (error) {
        winstonLogger.error(`Error en getUsers - user.service.js --> ${error}`)
        throw new Error(`Error en getUsers - user.service.js --> ${error}`)
      }
    }

    async updateUserById(userId, userUpdated){
        try {
            return await usersRepository.updateUserById(userId, userUpdated)
        } catch (error) {
            winstonLogger.error(`Error en updateUserById - user.service.js --> ${error}`)
            throw new Error(`Error en updateUserById - user.service.js --> ${error}`)
        }
    }


        // Funcion que genera token para actualizar contrasenia y lo envia por mail al mail ingresado
    // hay qye ver como recive el parametro, si se le pasara solo el id o el req.body entero por lo cual habra que destructurar la propeidad
    async obtainTokenForPassUpdate(userId){ 
        const user = await usersService.getUserById(userId)
        const idUser = user._id
        // Generamos un token de algun dato del usuario y modificamos la funcion de encriptacion para poder pasarle un tiempo de expiracion por parametro
        const token = encriptarJWT({userId}, "1h")
        // console.log("******  Linea 77 users.service.js ******");
        // console.log(token);
        // console.log("******  Linea 79 users.service.js ******");
        const resetToken = new ResetToken({userId, token})
        // console.log("******  Linea 81 users.service.js ******");
        // console.log("resetToken --> ", resetToken);
        // console.log("******  Linea 83 users.service.js ******");
        const addedResetToken = await resetTokensRepository.addResetToken(resetToken)
        // console.log("******  Linea 86 users.service.js ******");
        // console.log("addedResetToken --> ", addedResetToken);
        // console.log("******  Linea 88 users.service.js ******");
        
        const resetPasswordUrl = `http://localhost:8080/resetPasswordForm?token=${token}&email=${user.email}`
        
        // console.log("******  Linea 92 users.service.js ******");
        // console.log("resetPasswordUrl --> ", resetPasswordUrl);
        // console.log("******  Linea 94 users.service.js ******");
        
        const mailEnviado = await emailService.sendPasswordReset(user.email, "Reestablecimiento de contraseña", resetPasswordUrl )
        
        // console.log("******  Linea 98 users.service.js ******");
        // console.log("mailEnviado --> ", mailEnviado);
        // console.log("******  Linea 100 users.service.js ******");

        return addedResetToken
    }

    async updateUserPassword(userId, password, token){

        let resetToken;

        // Validacion que se fija que exista el token en la base de datos
        try {
            resetToken = await resetTokensRepository.getResetTokenByUserId(userId)
        } catch (error) {
            throw new Error (`pedido invalido: no tiene autorizacion para reestablecer la contraseña - 1`)   
        }
        
        // Me fijo si esta expirado tratando de desencriptar el token. Si falla al hacer la desencriptacion correcta es porque esta expirado
        try {
            desencriptarJWT(token)
        } catch (error) {

            this.obtainTokenForPassUpdate(userId)
            // throw new Error (`pedido invalido: sesion expirada - 2`)   

        }

        // Comparo los tokens (el q memandaron y el que tengo guardado)
        if ( token !== resetToken.token) {
            throw new Error (`pedido invalido: no tiene autorizacion para reestablecer la contraseña - 3`)
        }
        const previousUser = await usersService.getUserById(userId)
        if(isValidHash(password, previousUser.password)){
            throw new Error(`La password nueva debe ser diferente a la existente`)
        }


        const hashedPass = createHash(password)
        const actualizations = {password: hashedPass}
        const updatedUser = await usersRepository.updateUserById(userId, actualizations)
        return updatedUser
    }

}

export const usersService = new UserService()