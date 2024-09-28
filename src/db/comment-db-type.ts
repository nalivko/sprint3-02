import { ObjectId } from "mongodb"

export type CommentDbType = {
    _id?: ObjectId,
    postId: string,
    content: string,
    commentatorInfo: CommentatorInfo,
    createdAt: string,
}

type CommentatorInfo = {
    userId: string
    userLogin: string
}