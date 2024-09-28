import { Request, Response } from "express"
import { jwtService } from "../../../application/jwtService"
import { authRepository } from "../repositories/auth-repo"
import { log } from "console"

export const refreshTokensController = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        res.status(401).send()
        return
    }

    const verifiedToken = jwtService.verifyRefreshToken(refreshToken)
    // console.log('verified', verifiedToken);
    
    if (!verifiedToken) {
        res.status(401).send()
        return
    }
    const deviceId = verifiedToken.deviceId
    
    const iat = verifiedToken!.iat
    if (!iat) {
        res.status(401).send()
        return
    }
    const isSessionExist = await authRepository.getUserSession(deviceId, new Date(iat * 1000).toISOString())
    console.log(isSessionExist);
    
    if (!isSessionExist) {
        res.status(401).send()
        return
    }
    
    if (!verifiedToken.userId) {
        res.status(401).send()
        return
    }
    const userId = verifiedToken.userId
    
    const newAccessToken = await jwtService.createAccessToken(userId)

    const newRefreshToken = await jwtService.createRefreshToken(userId, deviceId)
    const verifiedNewRefreshToken = jwtService.verifyRefreshToken(newRefreshToken)
    
    await authRepository.updateUserSession(deviceId, new Date(verifiedNewRefreshToken!.iat! * 1000).toISOString(), new Date(verifiedNewRefreshToken!.exp! * 1000).toISOString())
    
    res
        .cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true })
        .status(200)
        .send({ accessToken: newAccessToken })
    return
}