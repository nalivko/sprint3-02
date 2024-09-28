import { ObjectId } from "mongodb"
import { authSessionsCollection } from "../../../db/mongodb"

export const securityRepository = {
    async getDeviceById(id: string) {
        return await authSessionsCollection.findOne({deviceId: id})
    },

    async deleteDeviceById(id: string, iat: string): Promise<boolean> {        
        const result = await authSessionsCollection.deleteOne({deviceId: id, iat: iat})

        return result.deletedCount === 1
    },

    async deleteAllDevices(userId: string, deviceId: string) {
        const result = await authSessionsCollection.deleteMany(
            {
                userId: userId,
                deviceId: {$nin: [deviceId]}
            }
        )
        
        return result.deletedCount >= 1
    }
}