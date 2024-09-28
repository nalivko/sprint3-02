import { NextFunction, Request, Response } from "express"
import { commentsQueryRepository } from "../repositories/commentsQueryRepository"

export const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId
    const commentId = req.params.commentId

    const comment = await commentsQueryRepository.getCommentById(commentId)

    if (!comment) {
        res.status(404)
        return
    }

    if (comment.commentatorInfo.userId !== userId) {
        res.send(403)
        return
    }

    next()
}