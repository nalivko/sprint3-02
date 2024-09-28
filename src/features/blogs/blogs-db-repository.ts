import { BlogDbType } from "../../db/blog-db-type"
import { BlogInputModel, BlogViewModel } from "./types/blogs-types"
import { blogsCollection } from "../../db/mongodb"
import { ObjectId } from "mongodb"

export const blogsRepository = {
    async getBlogById(id: string): Promise<BlogViewModel | null> {
        let blog = await blogsCollection.findOne({ _id: new ObjectId(id) })

        return blog ? this.mapBlog(blog) : null
    },

    async createBlog(newBlog: BlogDbType): Promise<BlogViewModel> {

        await blogsCollection.insertOne(newBlog)

        return this.mapBlog(newBlog)
    },

    async updateBlog(id: string, newData: BlogInputModel): Promise<boolean> {
        let result = await blogsCollection.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    name: newData.name,
                    description: newData.description,
                    websiteUrl: newData.websiteUrl,
                }
            })

        return result.matchedCount === 1
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