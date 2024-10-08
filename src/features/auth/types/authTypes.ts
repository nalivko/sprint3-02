export type loginInputType = {
    loginOrEmail: string,
    password: string
}

export type loginSuccessType = {
    accessToken: string
}

export type registrationUserModel = {
    login: string,
    password: string,
    email: string
}

export type registrationEmailResendingType = {
    email: string
}

export type ConfirmationCodeType = {
    code: string
}

export type passwordRecoveryModel = {
    email: string
}

export type newPasswordModel = {
    newPassword: string,
    recoveryCode: string
  }