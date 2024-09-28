import { Request, Response } from "express";
import { commentService } from "../services/commentsService";
import { CommentInputModel, CommentViewModel } from "../types/commentsTypes";

export const createCommentController = async (req: Request<{postId: string}, {}, CommentInputModel>, res: Response<CommentViewModel>) => {
    const postId = req.params.postId
    const comment = req.body.content
    const result = await commentService.cretePostComment(postId, comment, req.user!)
    
    return res.status(201).send(result)
}