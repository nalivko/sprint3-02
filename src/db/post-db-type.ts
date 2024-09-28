import { ObjectId } from "mongodb"

export type PostDbType = {
  _id?: ObjectId,
  title: string,
  shortDescription: string,
  content: string,
  blogId: ObjectId,
  blogName: string,
  createdAt: string
}