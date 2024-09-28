import { Request, Response } from "express"
import { PostViewModel } from "../types/posts-types"
import { postsRepository } from "../posts-db-repository"
import { postsService } from "../services/posts-service"

export const createPostController = async (req: Request, res: Response<PostViewModel>) => {
    const newPost = await postsService.createPost(req.body)

    res.status(201).send(newPost)
}