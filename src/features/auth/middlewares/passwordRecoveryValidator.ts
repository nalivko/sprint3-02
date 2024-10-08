import { body } from "express-validator";
import { checkErrorsMiddleware } from "../../../global-middlewares/checkErrorsMiddleware";
import { userQueryRepository } from "../../users/usersQueryRepository";

const passwordValidator =
    body('newPassword')
        .isString().withMessage('new password must be a string')
        .trim()
        .isLength({ min: 6, max: 20 }).withMessage('The password length must be between 6 and 20 characters')

const recoveryCodeValidator =
    body('recoveryCode')
        .custom(async code => {
            const user = await userQueryRepository.getUserByRecoveryCode(code)

            if (!user) {
                throw new Error('must be a user from users table')
            }

            return true
        })

export const passwordRecoveryValidator = [
    passwordValidator,
    recoveryCodeValidator,
    checkErrorsMiddleware
]