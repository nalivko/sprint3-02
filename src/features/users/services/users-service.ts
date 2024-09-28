import { bcryptService } from "../../../application/bcryptService";
import { UserDbType } from "../../../db/user-db-type";
import { UserInputModel, UserViewModel } from "../types/users-type";
import { userQueryRepository } from "../usersQueryRepository";
import { usersRepository } from "../usersRepository";
import bcrypt from 'bcrypt'

export type result<T = null> = {
    status: string,
    errorMessages?: [{ field: string | null, message: string | null }],
    data: T
}

export const usersService = {

    async createUser(user: UserInputModel): Promise<result<UserViewModel | null>> {
        const isUniqueUser = await this.doesUserExist(user)

        if (!isUniqueUser.isUnique) {
            return {
                status: '400',
                errorMessages: [
                    { field: isUniqueUser.field, message: isUniqueUser.field + ' should be unique' }
                ],
                data: null
            }
        }


        // const passwordSalt = await bcrypt.genSalt(10)
        // const passwordHash = await bcrypt.hash(user.password, passwordSalt)
        const passwordHash = await bcryptService.generateHash(user.password)

        const newUser: UserDbType = {
            login: user.login,
            email: user.email,
            passwordHash: passwordHash,
            emailConfirmation: {
                confirmationCode: "",
                confirmationCodeExpirationDate: new Date(),
                isConfirmed: false,
            },
            createdAt: new Date().toISOString()
        }

        const result = await usersRepository.createUser(newUser)

        return {
            status: '204',
            data: result
        }
    },

    async findUserById(id: string) {
        return await userQueryRepository.getUserById(id)
    },

    async doesUserExist(user: UserInputModel) {
        return await usersRepository.doesUserExist(user)
    },

    async deleteUser(id: string) {
        return await usersRepository.deleteUserById(id)
    }
}