import { winstonLogger } from "../middlewares/winstonLogger.js"
import userModel from "../models/Users.model.js"

class UserManager {
  constructor(userDB) {
    this.collection = userDB
  }

  async addUser(user) {
    try {
      return await this.collection.create(user)
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

  async getUsers() {
    try {
      return await this.collection.find().lean()
    } catch (error) {
      throw new Error(`Error en getUsers - UserManager.js --> ${error}`)
    }
  }
}

export const userManager = new UserManager(userModel)
