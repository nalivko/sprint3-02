import { Request, Response } from "express"
import { newPasswordModel } from "../types/authTypes"
import { authService } from "../services/authService"

export const newPasswordController = async (req: Request<{}, {}, newPasswordModel>, res: Response) => {
    const result = await authService.changePassword(req.body.newPassword, req.body.recoveryCode)

    if (result.status === 400) {
        res.status(400).send('password not updated')
    }

    res.status(204).send()
}