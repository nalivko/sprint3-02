import { Request, Response } from "express";
import { commentService } from "../services/commentsService";
import { CommentInputModel } from "../types/commentsTypes";
import { Result } from "../../../types/resultType"

export const updateCommentController = async (req: Request<{commentId: string}, {}, CommentInputModel>, res: Response) => {
    const result = await commentService.updateComment(req.params.commentId, req.body, req.user.userId)

    res.send(result.status)
}