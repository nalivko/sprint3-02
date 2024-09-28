import { ObjectId } from "mongodb";
import { BlogDbType } from "../../../db/blog-db-type";
import { PostDbType } from "../../../db/post-db-type";
import { setPostsQueryParams, setBlogsQueryParams } from "../../../helpers/helper";
import { BlogInputModel, BlogsViewCollectionModel, BlogViewModel } from "../types/blogs-types";
import { PostInputModel } from "../../posts/types/posts-types";
import { postsRepository } from "../../posts/posts-db-repository";
import { blogsRepository } from "../blogs-db-repository";
import { blogsQueryRepository } from "../blogs-query-repository";
import { postsQueryRepository } from "../../posts/posts-query-repository";

export const blogsService = {
    
    async findBlogs(query: {[key: string]: string | undefined}): Promise<BlogsViewCollectionModel> {
        const queryParams = setBlogsQueryParams(query)

        return blogsQueryRepository.findBlogs(queryParams)
    },

    async getBlogById(id: string): Promise<BlogViewModel | null> {
        return blogsRepository.getBlogById(id)
    },

    async createBlog(blog: BlogInputModel): Promise<BlogViewModel> {
        const newBlog: BlogDbType = {
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }

        return await blogsRepository.createBlog(newBlog)
    },

    async updateBlog(id: string, data: BlogInputModel): Promise<boolean> {
        return await blogsRepository.updateBlog(id, data)
    },

    async deleteBlog(id: string): Promise<boolean> {
        return await blogsRepository.deleteBlog(id)
    },

    async getPostByBlogId(query: { [key: string]: string | undefined }, blogId: string) {
        const queryParams = setPostsQueryParams(query)

        return await postsQueryRepository.findPosts(queryParams, blogId)
    },

    async createPostByBlogId(blogId: string, post: PostInputModel) {
        const blog = await this.getBlogById(blogId)

        const newPost: PostDbType = {
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: new ObjectId(blogId),
            blogName: blog!.name,
            createdAt: new Date().toISOString()
        }
        return await postsRepository.createPost(newPost)
    }
}