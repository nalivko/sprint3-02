import { ObjectId } from "mongodb";
import { PostDbType } from "../../../db/post-db-type";
import { setPostsQueryParams } from "../../../helpers/helper";
import { PostInputModel, PostViewModel } from "../types/posts-types";
import { blogsService } from "../../blogs/services/blogs-service";
import { postsRepository } from "../posts-db-repository";
import { postsQueryRepository } from "../posts-query-repository";

export const postsService = {

    async findPosts(query: { [key: string]: string | undefined }): Promise<{}> {
        const queryParams = setPostsQueryParams(query)

        return await postsQueryRepository.findPosts(queryParams)
    },

    async getPostById(id: string): Promise<PostViewModel | null> {
        return await postsRepository.getPostById(id)
    },

    async createPost(post: PostInputModel): Promise<PostViewModel> {
        const blog = await blogsService.getBlogById(post.blogId)

        const newPost: PostDbType = {
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: new ObjectId(post.blogId),
            blogName: blog!.name,
            createdAt: new Date().toISOString()
        }

        return await postsRepository.createPost(newPost)
    },

    async updatePost(id: string, data: PostInputModel): Promise<boolean> {
        return await postsRepository.updatePost(id, data)
    },

    async deletePost(id: string): Promise<boolean> {
        return await postsRepository.deletePost(id)
    }
}