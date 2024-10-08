import { body } from "express-validator";
import { checkErrorsMiddleware } from "../../../global-middlewares/checkErrorsMiddleware";

const emailValidator =
    body('email')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).withMessage("pattern email")
        .isEmail()

export const emailValidators = [
    emailValidator,
    checkErrorsMiddleware
]