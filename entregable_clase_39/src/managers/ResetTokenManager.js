import resetTokensModel from "../models/ResetTokens.model.js"

class ResetTokensManager {
    constructor(resetTokensModel) {
        this.collection = resetTokensModel
    }

    async addResetToken(resetToken) {
        try {
            return await this.collection.create(resetToken)
        } catch (error) {
            throw new Error(`Error en addResetToken - TicketManager.js --> ${error}`)
        }
    }

    async getResetTokenByUserId(userId){
        try {
        return await this.collection.findOne({ userId: userId}).lean()
        } catch (error) {
        throw new Error(`Error en getResetTokenByUserId - TicketManager.js --> ${error}`)
        }
    } 
}

export const resetTokenManager = new ResetTokensManager(resetTokensModel)