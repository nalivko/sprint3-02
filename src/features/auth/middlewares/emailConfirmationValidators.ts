import { body } from "express-validator";
import { checkErrorsMiddleware } from "../../../global-middlewares/checkErrorsMiddleware";

const codeValidator =
    body('code')
        .isString().withMessage('code must be a string')
        .trim()
        // .matches(/^[a-zA-Z0-9_-]*$/).withMessage('pattern')
        // .isLength({ min: 3, max: 10 }).withMessage('The login length must be between 3 and 10 characters')

export const emailConfirmationValidators = [
    codeValidator,
    checkErrorsMiddleware
]