import { ObjectId } from "mongodb"

export type UserDbType = {
  _id?: ObjectId
  login: string,
  // password: string,
  email: string,
  passwordHash: string,
  emailConfirmation: {
    confirmationCode: string,
    confirmationCodeExpirationDate: Date,
    isConfirmed: boolean,
  }
  createdAt: string
}