import { Request, Response } from "express"
import { securityQueryRepository } from "../repositories/securityQueryRepository"
import { jwtService } from "../../../application/jwtService"

export const getDevicesController = async (req: Request, res: Response) => {    
    const refreshToken = req.cookies.refreshToken
    const verifiedToken = jwtService.verifyRefreshToken(refreshToken)
  
    const activeSessions = await securityQueryRepository.getActiveDevices(verifiedToken!.userId)

    res.send(activeSessions)
}