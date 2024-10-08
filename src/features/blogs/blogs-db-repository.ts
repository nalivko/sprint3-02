import { BlogDbType } from "../../db/blog-db-type"
import { BlogInputModel, BlogViewModel } from "./types/blogs-types"
import { blogsCollection } from "../../db/mongodb"
import { ObjectId } from "mongodb"
import { BlogModelClass } from "./domain/blog.entity"

export const blogsRepository = {
    async getBlogById(id: string): Promise<BlogViewModel | null> {
        let blog = await BlogModelClass.findOne({ _id: id })

        return blog ? this.mapBlog(blog) : null
    },

    async createBlog(newBlog: BlogDbType): Promise<BlogViewModel> {

        const blogInstance = new BlogModelClass(newBlog)
        await blogInstance.save()
        const createdBlog = await BlogModelClass.create(newBlog)

        return this.mapBlog(createdBlog)
    },

    async updateBlog(id: string, newData: BlogInputModel): Promise<boolean> {
        const result = await BlogModelClass.findOneAndUpdate({ _id: id }, newData)

        if (!result) {
            return false;
        }

        return true
    },

    async deleteBlog(id: string): Promise<boolean> {
        const result = await blogsCollection.deleteOne({ _id: new ObjectId(id) })

        return result.deletedCount === 1
    },

    mapBlog(blog: BlogDbType) {
        return {
            id: (blog._id!).toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        }
    }
}