import { Request, Response } from "express"
import { BlogInputModel, BlogViewModel } from "../types/blogs-types"
import { blogsService } from "../services/blogs-service"

export const createBlogController = async (req: Request<any, any, BlogInputModel>, res: Response<BlogViewModel>) => {
    const newBlog = await blogsService.createBlog(req.body)

    res.status(201).send(newBlog)
}