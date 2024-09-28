import bcrypt from 'bcrypt'

export const bcryptService = {
    async generateHash(password: string) {
        const passwordSalt = await bcrypt.genSalt(10)
        
        return await bcrypt.hash(password, passwordSalt)
    }
}