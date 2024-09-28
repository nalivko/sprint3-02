import { param } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { postsRepository } from "../../posts/posts-db-repository";

export const postIdValidator = async (req: Request, res: Response, next: NextFunction) => {
    const post = await postsRepository.getPostById(req.params.postId)

    if (!post) {
        res.sendStatus(404)
        return
    }

    
    next()
}