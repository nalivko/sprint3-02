import { Request, Response } from "express"
import { jwtService } from "../../../application/jwtService"
import jwt, { JwtPayload } from 'jsonwebtoken'
import { SETTINGS } from "../../../settings"
import { log } from "console"

export const testController = (req: Request, res: Response) => {
    if (!req.headers.authorization) {
        res.send(401)
        return
    }

    const token = req.headers.authorization.split(' ')[1]
    const userId = jwtService.verifyAccessToken(token)
    try {
        const result = jwt.verify(token, SETTINGS.AC_SECRET)
        res.send(result)
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.name); // the type of error
            console.log(err.message); // the description of the error
            console.log(err.stack); // the stack trace of the error
          }
        res.send(err)
    }
    

    // console.log('result', result);
    // res.send(result)
    // return
}