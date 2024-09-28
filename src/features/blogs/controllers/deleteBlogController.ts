import { Request, Response } from "express"
import { blogsService } from "../services/blogs-service"

export const deleteBlogController = async (req: Request<{ id: string }>, res: Response) => {

    const isDeleted = await blogsService.deleteBlog(req.params.id)

    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
}