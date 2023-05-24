import { userManager } from "../managers/UserManager.js";
import { winstonLogger } from "../middlewares/winstonLogger.js";
import { usersRepository } from "../repositories/users.repository.js";

class UserService {


    async addUser(user){
      try {
        // await userManager.addUser(user);
        await usersRepository.addUser(user);
        winstonLogger.info(`Usuario creado -- - ${new Date().toLocaleTimeString()}`)
        return user
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
    
    async getUsers(){
      try {
        // return await userManager.getUsers();
        return await usersRepository.getUsers();
      } catch (error) {
        winstonLogger.error(`Error en getUsers - user.service.js --> ${error}`)
        throw new Error(`Error en getUsers - user.service.js --> ${error}`)
      }
    }

}

export const usersService = new UserService()