import { Request, Response } from "express"
import { BlogViewModel } from "../types/blogs-types"
import { blogsService } from "../services/blogs-service"

export const findBlogController = async (req: Request<{ id: string }>, res: Response<BlogViewModel | null>) => {

    const blog = await blogsService.getBlogById(req.params.id)

    if (blog) {
        res.send(blog)
    } else {
        res.sendStatus(404)
    }
}