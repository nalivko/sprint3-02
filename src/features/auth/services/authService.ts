import bcrypt from 'bcrypt'
import { randomUUID } from "crypto"
import { add } from "date-fns/add"
import { WithId } from "mongodb"
import { bcryptService } from "../../../application/bcryptService"
import { jwtService } from "../../../application/jwtService"
import { UserDbType } from "../../../db/user-db-type"
import { emailManager } from "../../../managers/email-manager"
import { Result } from "../../../types/resultType"
import { usersRepository } from "../../users/usersRepository"
// import { expiredTokensRepository } from '../repositories/expired-tokens-repo'

export const authService = {
    async registerUser(login: string, email: string, password: string): Promise<Result<UserDbType | null>> {
        const existField = await usersRepository.doesExistByLoginOrEmail(login, email)
        if (existField) {
            return {
                status: 400,
                exttensions: [{
                    message: "User allready exist",
                    field: existField
                }],
                data: null
            }
        }
        const passwordHash = await bcryptService.generateHash(password)
        const newUser: UserDbType = {
            login,
            email,
            passwordHash,
            createdAt: new Date().toISOString(),
            emailConfirmation: {
                confirmationCode: randomUUID(),
                confirmationCodeExpirationDate: add(new Date(), {
                    hours: 1,
                    minutes: 30
                }),
                isConfirmed: false
            }
        }
        await usersRepository.createUser(newUser)

        try {
            await emailManager.sendConfirmationCode(newUser.email, newUser.emailConfirmation.confirmationCode)
        } catch (error) {
            console.error(error)
        }

        return {
            status: 204,
            // data: newUser
            data: null
        }
    },

    async confirmEmail(code: string): Promise<Result> {
        let user = await usersRepository.findUserByConfirmationCode(code)
        if (!user) {
            return {
                status: 400,
                exttensions: [{
                    message: 'User with this code not found',
                    field: "code"
                }],
                data: null
            }
        }
        if (user.emailConfirmation.isConfirmed) {
            return {
                status: 400,
                exttensions: [{
                    message: 'This code allready applied',
                    field: "code"
                }],
                data: null
            }
        }
        if (user.emailConfirmation.confirmationCodeExpirationDate < new Date()) {
            return {
                status: 400,
                exttensions: [{
                    message: 'the confirmation code has expired',
                    field: "confirmationCodeExpirationDate"
                }],
                data: null
            }
        }
        if (user.emailConfirmation.confirmationCode === code && user.emailConfirmation.confirmationCodeExpirationDate > new Date()) {
            let result = await usersRepository.updateConfirmation(user._id.toString())
            if (result) {
                return {
                    status: 204,
                    data: null
                }
            }
        }
        return {
            status: 400,
            exttensions: [{
                message: 'error',
                field: "field"
            }],
            data: null
        }
    },

    // async login(loginOrEmail: string, password: string): Promise<string | null> {
    //     const userId = await this.checkCredentials(loginOrEmail, password)

    //     if (!userId) return null

    //     return await jwtService.createAccessToken(userId)
    // },

    async generateNewAccessToken(refreshToken: string, userId: string): Promise<string | null> {
        try {
            await jwtService.verifyRefreshToken(refreshToken)
            
            // if (await expiredTokensRepository.isTokenExpired(refreshToken)) {
            //     return null
            // }
        } catch(err) {
            return null
        }
        return await jwtService.createAccessToken(userId)
    },

    // async generateRefreshToken(userId: string, oldToken: string | null = null) {
    //     if (oldToken) {
    //         await this.addToExpiredTokens(oldToken)
    //     }
    //     return await jwtService.createRefreshToken(userId)
    // },

    async checkCredentials(loginOrEmail: string, password: string): Promise<string | null> {
        const user = await usersRepository.findUserByLoginOrEmail(loginOrEmail)

        if (!user) return null

        const isCorrect = await bcrypt.compare(password, user.passwordHash)

        if (!isCorrect) return null

        return user._id.toString();
    },

    async resendConfirmationCode(email: string): Promise<Result<null>> {
        const user = await usersRepository.findUserByLoginOrEmail(email)
        if (!user) {
            return {
                status: 400,
                exttensions: [{
                    message: 'User with this email not found',
                    field: "email"
                }],
                data: null
            }
        }
        if (user.emailConfirmation.isConfirmed === true) {
            return {
                status: 400,
                exttensions: [{
                    message: 'User with this email allready confirmed',
                    field: "email"
                }],
                data: null
            }
        }
        const newCode = randomUUID()
        const codeUpdated = await usersRepository.updateConfirmationCode(user._id, newCode)

        if (codeUpdated) {
            try {
                await emailManager.sendConfirmationCode(email, newCode)
            } catch (error) {
                console.error(error)
            }
        }

        return {
            status: 204,
            data: null
        }
    },

    // async addToExpiredTokens(refreshToken: string) {
    //     expiredTokensRepository.addToken({token: refreshToken})
    // },

    // async verifyRefreshToken(refreshToken: string): Promise<boolean | null> {
    //     try {
    //         const verifiedToken = await jwtService.verifyRefreshToken(refreshToken)
            
    //         if (await expiredTokensRepository.isTokenExpired(refreshToken)) {
    //             return false
    //         }

    //         return verifiedToken?.userId
    //     } catch(err) {
    //         return false
    //     }
    // }
}