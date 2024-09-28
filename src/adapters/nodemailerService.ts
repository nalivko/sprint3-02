import nodemailer from "nodemailer"

export const nodemailerService = {
    async sendEmail(email: string, subject: string, message: string) {
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "nalivko.dmitr@gmail.com",
                pass: "vjgybckizggjyntz",
            },
        })

        const info = await transport.sendMail({
            from: 'Dima',
            to: email,
            subject: subject,
            // text: req.body.message, // plain text body
            html: message,
        });
        // vjgy bcki zggj yntz 

        // console.log("Info: ", info);

        return info
    }
}