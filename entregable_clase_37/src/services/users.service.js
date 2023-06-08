import { userManager } from "../managers/UserManager.js";
import { winstonLogger } from "../middlewares/winstonLogger.js";
import { usersRepository } from "../repositories/users.repository.js";

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
        console.log("****** linea 33 -- users.service.js");
        console.log("userId -->", userId);
        console.log("****** linea 35 -- users.service.js");
        const user = await usersRepository.getUserById(userId);
        console.log("****** linea 37 -- users.service.js");
        console.log("user -->", user);
        console.log("****** linea 39 -- users.service.js");
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

}

export const usersService = new UserService()