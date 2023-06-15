import { winstonLogger } from "../middlewares/winstonLogger.js"
import userModel from "../models/Users.model.js"

class UserManager {
  constructor(model) {
    this.collection = model
  }

  async addUser(user) {
    try {
        let usercreated = await this.collection.create(user)
        return usercreated;
    } catch (error) {
      winstonLogger.error(`Error en addUser - UserManager.js --> ${error}`)
      throw new Error(`Error en addUser - UserManager.js --> ${error}`)
    }
  }

  async getUserByEmail(email) {
    try {
      return await this.collection.findOne({ email: email }).lean()
    } catch (error) {
      throw new Error(`Error en getUserByEmail - UserManager.js --> ${error}`)
    }
  }

  async getUserById(userId) {
    try {
        // console.log("****** linea 29 -- userManager.js");
        // console.log("userId -->", userId);
        // console.log("****** linea 31 -- userManager.js");
      const user =  await this.collection.findOne({ _id: userId }).lean()
    //   console.log("***** linea 33 -- userManager.js");
    //   console.log("user -->", user);
    //   console.log("***** linea 35 -- userManager.js");
      return user;
    } catch (error) {
      throw new Error(`Error en getUserById- UserManager.js --> ${error}`)
    }
  }

  async getUsers() {
    try {
      return await this.collection.find().lean()
    } catch (error) {
      throw new Error(`Error en getUsers - UserManager.js --> ${error}`)
    }
  }

  async updateUserById(userId, userUpdated){
    try {
        const searchedUser = await this.collection.findOne({_id: userId})
        if (!searchedUser) {
            winstonLogger.error(
              `Error: the product whith de id:${productId} do not exist in the array`
            )
            throw new Error(
              `Error: the product whith de id:${productId} do not exist in the array`
            )
          }

          const updatedUser = await this.collection.updateOne({_id: userId}, userUpdated).lean()

          return updatedUser
    } catch (error) {
        winstonLogger.error(
            `Error: the product whith de id:${userId} do not exist in the array!!! -- userManager.js`
          )
          throw new Error(
            `Error: the product whith de id:${userId} do not exist in the array!!!`
          )
    }
  }
}

export const userManager = new UserManager(userModel)
