import { body } from "express-validator";
import { checkErrorsMiddleware } from "../../../global-middlewares/checkErrorsMiddleware";

const loginValidator =
    body('login')
        .isString().withMessage('login must be a string')
        .trim()
        .matches(/^[a-zA-Z0-9_-]*$/).withMessage('pattern')
        .isLength({ min: 3, max: 10 }).withMessage('The login length must be between 3 and 10 characters')

const passwordValidator =
    body('password')
        .isString().withMessage('password must be a string')
        .trim()
        .isLength({ min: 6, max: 20 }).withMessage('The password length must be between 6 and 20 characters')

const emailValidator =
    body('email')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).withMessage("pattern email")
        .isEmail()

export const registrationValidators = [
    loginValidator,
    passwordValidator,
    emailValidator,
    checkErrorsMiddleware
]