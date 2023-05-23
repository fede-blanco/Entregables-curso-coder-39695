import { userManager } from "../managers/UserManager.js";

class UserRepository {


    async addUser(user){
      try {
        await userManager.addUser(user);
        return user
      } catch (error) {
        throw new Error(`Error en assUser - user.repository.js --> ${error}`)
      }
    }
    
    
    async getUserByEmail(email){
      try {
        return await userManager.getUserByEmail(email);
      } catch (error) {
        throw new Error(`Error en getUserByEmail - user.repository.js --> ${error}`)
      }
    }
    
    async getUsers(){
      try {
        return await userManager.getUsers();
      } catch (error) {
        throw new Error(`Error en getUsers - user.repository.js --> ${error}`)
      }
    }

}

export const usersRepository = new UserRepository()