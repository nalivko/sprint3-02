import { Request, Response } from "express"
import { postsService } from "../services/posts-service"

export const deletePostController = async (req: Request<{ id: string }>, res: Response) => {
    const isDeleted = await postsService.deletePost(req.params.id)

    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
}