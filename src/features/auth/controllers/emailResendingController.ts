import { Request, Response } from "express"
import { authService } from "../services/authService"
import { registrationEmailResendingType } from "../types/authTypes"
import { ErrorsMessagesType } from "../../../types/errorsMessagesType"

export const emailResendingController = async (req: Request<{}, {}, registrationEmailResendingType>, res: Response<ErrorsMessagesType | undefined>) => {
    const result = await authService.resendConfirmationCode(req.body.email)

    res.status(result.status).json(result.exttensions ? {errorsMessages:result.exttensions} : undefined)
}