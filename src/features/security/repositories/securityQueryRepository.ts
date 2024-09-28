import { ObjectId } from "mongodb"
import { authSessionsCollection } from "../../../db/mongodb"
import { DeviceDbType } from "../../../db/devices-db-type"

export const securityQueryRepository = {
    async getActiveDevices(userId: string) {
        const result = await authSessionsCollection.find({
            userId: userId,
            exp: {
                $gt: new Date().toISOString()
            }
        }).toArray()

        return this.mapDevices(result)
    },

    mapDevices(devices: DeviceDbType[])  {
        return devices.map(device => {
            return {
                ip: device.ip,
                title: device.deviceName,
                lastActiveDate: device.exp,
                deviceId: device.deviceId
              }
        })
    }
}