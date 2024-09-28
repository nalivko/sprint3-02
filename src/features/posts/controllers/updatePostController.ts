import { Request, Response } from "express"
import { postsService } from "../services/posts-service"

export const updatePostController = async (req: Request, res: Response) => {

    const isUpdated = await postsService.updatePost(req.params.id, req.body)

    if (isUpdated) {
        res.send(204)
    } else {
        res.sendStatus(404)
    }
}