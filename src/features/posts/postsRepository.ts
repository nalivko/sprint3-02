import { ObjectId } from "mongodb"
import { db } from "../../db/db"
import { PostDbType } from "../../db/post-db-type"
import { PostInputModel } from "./types/posts-types"
import { blogsRepository } from "../blogs/blogsRepository"

export const postsRepository = {
    getAllPosts() {
        const allPosts = db.posts

        return allPosts
    },

    getPostById(id: string) {
        return db.posts.find(post => post._id === new ObjectId(id))
    },

    createPost(post: PostInputModel) {
        const newPost: PostDbType = {
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: new ObjectId(post.blogId),
            blogName: blogsRepository.getBlogById(post.blogId)!.name,
            createdAt: new Date().toISOString()
        }

        db.posts.push(newPost)
        return newPost._id
    },

    updatePost(id: string, newData: PostInputModel) {
        let post = db.posts.find(post => post._id === new ObjectId(id))

        if (post) {

            post.title = newData.title,
                post.shortDescription = newData.shortDescription,
                post.content = newData.content,
                post.blogId = new ObjectId(newData.blogId)

            return true
        } else {
            return false
        }
    },

    deletePost(id: string) {
        for (let i = 0; i < db.posts.length; i++) {
            if (db.posts[i]._id === new ObjectId(id)) {
                db.posts.splice(i, 1)
                return true
            }
        }

        return false
    }

}