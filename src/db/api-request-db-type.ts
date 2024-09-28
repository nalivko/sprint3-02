import { ObjectId } from "mongodb"

export type ApiRequestDbType = {
  _id?: ObjectId,
  ip: string,
  URL: string,
  date: Date,
}