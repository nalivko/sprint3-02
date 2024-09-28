import { NextFunction, Request, Response } from "express"
import { jwtService } from "../application/jwtService"

export const refreshTokenMiddleware = async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        res.status(401).send()
        return
    }

    const verifiedToken = jwtService.verifyRefreshToken(refreshToken)
    
    if (!verifiedToken) {
        res.status(401).send()
        return
    }

    next()
}