import { Request, Response } from "express"
import { passwordRecoveryModel } from "../types/authTypes"
import { authService } from "../services/authService"

export const passwordRecoveryController = async (req: Request<{}, {}, passwordRecoveryModel>, res: Response) => {
    await authService.passwordRecovery(req.body.email)

    res.status(204).send()
}