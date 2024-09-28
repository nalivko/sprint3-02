import { Request, Response } from "express"
import { securityRepository } from "../repositories/securityRepository"
import { jwtService } from "../../../application/jwtService"

export const deleteAllDevicesController = async (req: Request, res: Response) => {
    const verifiedToken = jwtService.verifyRefreshToken(req.cookies.refreshToken)
    const userId = verifiedToken!.userId
    const deviceId = verifiedToken!.deviceId

    await securityRepository.deleteAllDevices(userId, deviceId)

    res.send(204)
}