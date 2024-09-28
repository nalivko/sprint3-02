import { Request, Response } from "express"
import { BlogInputModel } from "../types/blogs-types"
import { blogsService } from "../services/blogs-service"

export const updateBlogController = async (req: Request<{ id: string }, any, BlogInputModel>, res: Response) => {
    const isUpdated = await blogsService.updateBlog(req.params.id, req.body)

    if (isUpdated) {
        res.send(204)
    } else {
        res.send(404)
    }
}