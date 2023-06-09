import { userManager } from "../managers/UserManager.js";

class UserRepository {


    async addUser(user){
      try {
        let usercreated = await userManager.addUser(user);
        return usercreated
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

    async getUserById(userId){
      try {
        // console.log("****** linea 26 -- users.repository.js");
        // console.log("userId -->", userId);
        // console.log("****** linea 28 -- users.repository.js");
        return await userManager.getUserById(userId);
      } catch (error) {
        throw new Error(`Error en getUserById - user.repository.js --> ${error}`)
      }
    }
    
    async getUsers(){
      try {
        return await userManager.getUsers();
      } catch (error) {
        throw new Error(`Error en getUsers - user.repository.js --> ${error}`)
      }
    }

    async updateUserById(userId, userUpdated){
        try {
            return await userManager.updateUserById(userId, userUpdated)
        } catch (error) {
            throw new Error(`Error en updateUserById - user.repository.js --> ${error}`)
        }
    }

}

export const usersRepository = new UserRepository()