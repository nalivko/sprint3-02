import { Router } from "express";
import { loginController } from "./controllers/loginController";
import { authController } from "./controllers/authController";
import { authValidators } from "./middlewares/authValidators";
import { authJWTMiddleware } from "../../global-middlewares/authJWTMiddleware";
import { registrationController } from "./controllers/registrationController";
import { emailConfirmationController } from "./controllers/emailConfirmationController";
import { emailResendingController } from "./controllers/emailResendingController";
import { registrationValidators } from "./middlewares/registrationValidators";
import { emailConfirmationValidators } from "./middlewares/emailConfirmationValidators";
import { emailResendingValidators } from "./middlewares/emailResendingValidators";
import { emailValidators } from "./middlewares/emailValidators";
import { refreshTokensController } from "./controllers/refreshTokensController";
import { logoutController } from "./controllers/logoutController";
import { passwordRecoveryController } from "./controllers/passwordRecoveryController";
import { newPasswordController } from "./controllers/newPasswordController";
import { testController } from "./controllers/testController";
import { apiRequestsMiddleware } from "../../global-middlewares/apiRequestsMiddleware";
import { passwordRecoveryValidator } from "./middlewares/passwordRecoveryValidator";

export const authRouter = Router({})

authRouter.post('/registration', apiRequestsMiddleware, registrationValidators, registrationController)
authRouter.post('/registration-confirmation', apiRequestsMiddleware, emailConfirmationValidators, emailConfirmationController)
authRouter.post('/registration-email-resending', apiRequestsMiddleware, emailResendingValidators, emailResendingController)
authRouter.post('/login', apiRequestsMiddleware, ...authValidators, loginController)
authRouter.get('/me', authJWTMiddleware, authController)
authRouter.post('/refresh-token', refreshTokensController)
authRouter.post('/logout', logoutController)
authRouter.post('/password-recovery', apiRequestsMiddleware, emailValidators, passwordRecoveryController)
authRouter.post('/new-password', apiRequestsMiddleware, passwordRecoveryValidator, newPasswordController)
authRouter.post('/test', testController)