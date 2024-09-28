import { Request, Response } from "express"
import { PostInputModel, PostViewModel } from "../../posts/types/posts-types"
import { blogsService } from "../services/blogs-service"

export const createPostByBlogIdController = async (req: Request<any, any, PostInputModel>, res: Response<PostViewModel>) => {
    const newPost = await blogsService.createPostByBlogId(req.params.blogId, req.body)

    res.status(201).send(newPost)
}