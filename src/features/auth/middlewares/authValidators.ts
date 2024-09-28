import { body } from "express-validator";
import { checkErrorsMiddleware } from "../../../global-middlewares/checkErrorsMiddleware";

const loginOrEmailValidator =
    body('loginOrEmail')
        .isString().withMessage('login Or Email must be a string')
        .trim()

const passwordValidator =
    body('password')
        .isString().withMessage('password must be a string')
        .trim()
        .isLength({ min: 6, max: 20 }).withMessage('The password length must be between 6 and 20 characters')

export const authValidators = [
    loginOrEmailValidator,
    passwordValidator,
    checkErrorsMiddleware
]