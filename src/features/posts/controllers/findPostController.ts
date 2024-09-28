import { Request, Response } from "express"
import { PostViewModel } from "../types/posts-types"
import { postsService } from "../services/posts-service"

export const findPostController = async (req: Request, res: Response<PostViewModel>) => {
    const post = await postsService.getPostById(req.params.id)

    if (post) {
        res.send(post)
    } else {
        res.sendStatus(404)
    }
}