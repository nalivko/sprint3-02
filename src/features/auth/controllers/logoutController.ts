import { Request, Response } from "express";
import { jwtService } from "../../../application/jwtService";
import { securityRepository } from "../../security/repositories/securityRepository";
import { authRepository } from "../repositories/auth-repo";

export const logoutController = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken
    console.log('refresg', refreshToken);
    

    if (!refreshToken) {
        res.status(401).send()
        return
    }
    const verifiedToken = jwtService.verifyRefreshToken(refreshToken)
    if (!verifiedToken) {
        res.status(401).send()
        return
    }
    
    const deviceId = verifiedToken.deviceId
    const iat = verifiedToken.iat!

    const isSessionExist = await authRepository.getUserSession(deviceId, new Date(iat * 1000).toISOString())
    
    if (!isSessionExist) {
        res.status(401).send()
        return
    }
    
    await securityRepository.deleteDeviceById(deviceId, new Date(iat * 1000).toISOString())

    res.clearCookie('refreshToken').status(204).send();
    return
}