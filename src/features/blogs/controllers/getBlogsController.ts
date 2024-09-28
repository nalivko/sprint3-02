import { Request, Response } from "express"
import { blogsService } from "../services/blogs-service"
import { BlogsViewCollectionModel } from "../types/blogs-types"

export const getBlogsController = async (req: Request, res: Response<BlogsViewCollectionModel>) => {

    const allBlogs = await blogsService.findBlogs(req.query as { [key: string]: string | undefined })

    res.send(allBlogs)
}