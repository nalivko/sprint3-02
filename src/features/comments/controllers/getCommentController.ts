import { Request, Response } from "express";
import { commentService } from "../services/commentsService";
import { CommentViewModel } from "../types/commentsTypes";
import { commentsQueryRepository } from "../repositories/commentsQueryRepository";

export const getCommentController = async (req: Request<{id: string}>, res: Response<CommentViewModel | null>) => {
    const comment = await commentsQueryRepository.getCommentById(req.params.id)

    if (comment) {
        res.send(comment)
    } else {
        res.sendStatus(404)
    }
}