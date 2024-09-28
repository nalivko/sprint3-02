import { Request, Response } from "express"
import { blogsService } from "../services/blogs-service"

export const getPostsByBlogIdController = async (req: Request, res: Response<{}>) => {

    const posts = await blogsService.getPostByBlogId(req.query as { [key: string]: string | undefined }, req.params.blogId)

    res.send(posts)
}