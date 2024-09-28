import { AuthSessionDbType } from "../../../db/auth-session-db-type"
import { authSessionsCollection } from "../../../db/mongodb"

export const authRepository = {
    async createUserSession(session: AuthSessionDbType): Promise<boolean> {

        await authSessionsCollection.insertOne(session)

        return true
    },

    async getUserSession(deviceId: string, iat: string): Promise<boolean> {
        const userSession = await authSessionsCollection.findOne({ deviceId: deviceId, iat: iat })

        return userSession ? true : false
    },

    async updateUserSession(deviceId: string, iat: string, exp: string): Promise<boolean> {
        let result = await authSessionsCollection.updateOne(
            {deviceId},
            {$set: {iat, exp}}
        )

        return result.matchedCount === 1
    }
}