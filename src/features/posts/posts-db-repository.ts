import { ObjectId } from "mongodb"
import { postsCollection } from "../../db/mongodb"
import { PostDbType } from "../../db/post-db-type"
import { PostInputModel, PostViewModel } from "./types/posts-types"

export const postsRepository = {


    async getPostById(id: string): Promise<PostViewModel | null> {

        const post = await postsCollection.findOne({ _id: new ObjectId(id) })

        return post ? this.mapPost(post) : null
    },

    async createPost(newPost: PostDbType): Promise<PostViewModel> {

        await postsCollection.insertOne(newPost)

        return this.mapPost(newPost)
    },

    async updatePost(id: string, newData: PostInputModel): Promise<boolean> {

        const result = await postsCollection.updateOne({ _id: new ObjectId(id) }, {
            $set: {
                title: newData.title,
                shortDescription: newData.shortDescription,
                content: newData.content,
                blogId: new ObjectId(newData.blogId)
            }
        })

        return result.matchedCount === 1
    },

    async deletePost(id: string): Promise<boolean> {

        const result = await postsCollection.deleteOne({ _id: new ObjectId(id) })

        return result.deletedCount === 1
    },

    mapPost(post: PostDbType) {
        return {
            id: post._id!.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId.toString(),
            blogName: post.blogName,
            createdAt: post.createdAt
        }
    },

}

// reject(new Error('error in promise')) 6question