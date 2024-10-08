import { ObjectId } from "mongodb";
import { usersCollection } from "../../db/mongodb";
import { UserDbType } from "../../db/user-db-type";
import { UserInputModel, UserViewModel } from "./types/users-type";

export const usersRepository = {
    async doesUserExist(user: UserInputModel): Promise<{ isUnique: boolean, field: string | null }> {
        if (await usersCollection.findOne({ login: user.login })) {
            return { isUnique: false, field: 'login' }
        }

        if (await usersCollection.findOne({ email: user.email })) {
            return { isUnique: false, field: 'email' }
        }

        return { isUnique: true, field: null }
    },

    async createUser(user: UserDbType): Promise<UserViewModel> {
        await usersCollection.insertOne(user)

        return {
            id: (user._id!).toString(),
            login: user.login,
            email: user.email,
            createdAt: user.createdAt
        };
    },

    async deleteUserById(id: string): Promise<boo> {
        const result = await usersCollection.deleteOne({ _id: new ObjectId(id) })

        return result.deletedCount === 1
    },

    async findUserByLoginOrEmail(loginOrEmail: string): Promise<UserDbType | null> {
        return await usersCollection.findOne(
            {
                $or:
                    [
                        { login: loginOrEmail },
                        { email: loginOrEmail }
                    ]
            }
        )
    },

    async getUserById(id: string): Promise<UserDbType | null> {
        return await usersCollection.findOne({ _id: new ObjectId(id) })
    },

    async updateConfirmation(userId: string): Promise<boolean> {
        let result = await usersCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { 'emailConfirmation.isConfirmed': true } }
        )

        return result.matchedCount === 1
    },

    async doesExistByLoginOrEmail(login: string, email: string): Promise<'login' | 'email' | boolean> {
        if (await usersCollection.findOne({ login: login })) {
            return 'login'
        }

        if (await usersCollection.findOne({ email: email })) {
            return 'email'
        }

        return false
    },

    async findUserByConfirmationCode(code: string): Promise<UserDbType | null> {
        return await usersCollection.findOne({
            "emailConfirmation.confirmationCode": code
        })
    },

    async updateConfirmationCode(userId: ObjectId, code: string): Promise<boolean> {
        let result = await usersCollection.updateOne(
            { _id: userId },
            { $set: { 'emailConfirmation.confirmationCode': code } }
        )

        return result.matchedCount === 1
    },

    async updateRecoveryCode(userId: ObjectId, recoveryCode: string): Promise<boolean> {
        const result = await usersCollection.updateOne({ _id: userId }, { $set: { recoveryCode } })

        return result.matchedCount === 1
    },

    async updateUserPasswordAndRecoveryCode(passwordHash: string, userId: ObjectId): Promise<boolean> {
        const result = await usersCollection.updateOne(
            { _id: userId },
            {
                $set: { passwordHash, recoveryCode: '' }
            }
        )

        return result.matchedCount === 1
    }
}