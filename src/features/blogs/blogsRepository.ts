import { ObjectId } from "mongodb"
import { BlogDbType } from "../../db/blog-db-type"
import { db } from "../../db/db"
import { BlogInputModel } from "./types/blogs-types"

export const blogsRepository = {
    getAllBlogs() {
        const allBlogs = db.blogs

        return allBlogs
    },

    getBlogById(id: string) {
        return db.blogs.find(blog => blog._id === new ObjectId(id))
    },

    createBlog(blog: BlogInputModel) {
        const newBlog: BlogDbType = {
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: true
        }

        db.blogs.push(newBlog)
        return newBlog._id
    },

    updateBlog(id: string, newData: BlogInputModel) {
        let blog = this.getBlogById(id)

        if (blog) {
            blog.name = newData.name,
                blog.description = newData.description,
                blog.websiteUrl = newData.websiteUrl

            return true
        } else {
            return false
        }
    },

    deleteBlog(id: string) {
        for (let i = 0; i < db.blogs.length; i++) {
            if (db.blogs[i]._id === new ObjectId(id)) {
                db.blogs.splice(i, 1)
                return true
            }
        }
        return false
    },

}