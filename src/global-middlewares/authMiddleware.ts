import { NextFunction, Request, Response } from "express";
import { SETTINGS } from "../settings";

// decode
export const fromBase64ToUTF8 = (code: string) => {
    const buff = Buffer.from(code, 'base64')

    return buff.toString('utf-8')
}

//code
export const fromUTF8ToBase64 = (code: string) => {
    const buff = Buffer.from(code, 'utf-8')
    return buff.toString('base64')
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization'] as string

    if(!auth) {
        res.status(401).json({})
        return
    }

    if(auth.slice(0, 5) !== 'Basic') {
        res.status(401).json({})
        return
    }

    const codeAuth = fromUTF8ToBase64(SETTINGS.ADMIN_AUTH)

    if(auth.slice(6) !== codeAuth) {
        res.status(401).json({})
        return
    }

    next()
}