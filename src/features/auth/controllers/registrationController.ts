import { Request, Response } from "express"
import { authService } from "../services/authService"
import { registrationUserModel } from "../types/authTypes"

export const registrationController = async (req: Request<{}, {}, registrationUserModel>, res: Response) => {
    const result = await authService.registerUser(req.body.login, req.body.email, req.body.password)

    res.status(result.status).json(result.exttensions ? {errorsMessages:result.exttensions} : undefined)
}