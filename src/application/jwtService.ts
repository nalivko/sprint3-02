import jwt, { JwtPayload } from 'jsonwebtoken'
import { SETTINGS } from '../settings'

export const jwtService = {
    async createAccessToken(userId: string): Promise<string> {
        return jwt.sign(
            {
                user: {
                    // login: userLogin,
                    userId
                }
            },
            SETTINGS.AC_SECRET,
            {
                expiresIn: SETTINGS.AC_TIME
            }
        )
    },

    async createRefreshToken(userId: string, deviceId: string): Promise<string> {
        return jwt.sign(
            {userId, deviceId},
            SETTINGS.REFRESH_SECRET,
            {
                expiresIn: SETTINGS.REFRESH_TIME
            }
        )
    },

    verifyAccessToken(token: string): JwtPayload | null {
        try {
            const result = jwt.verify(token, SETTINGS.AC_SECRET) as JwtPayload

            return result
        } catch (error) {
            return null
        }
    },

    verifyRefreshToken(refreshToken: string): JwtPayload | null {
        try {
            const result = jwt.verify(refreshToken, SETTINGS.REFRESH_SECRET) as JwtPayload

            return result
        } catch (error) {
            return null
        }
    }

}