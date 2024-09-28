import { nodemailerService } from "../adapters/nodemailerService"

export const emailManager = {
    async sendConfirmationCode(email: string, code: string) {
        const message = "<h1>Thank for your registration</h1>" +
            "<div><a href='https://some.com/confirm-email?code="
            + code +
            "'>confirmation code</a></div>"

        await nodemailerService.sendEmail(email, "user confirmation recovery", message)
    }
}