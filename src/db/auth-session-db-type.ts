import { ObjectId } from "mongodb"

export type AuthSessionDbType = {
  _id?: ObjectId,
  userId: string,
  deviceId: string,
  iat: string,
  deviceName: string,
  ip: string,
  exp: string
}