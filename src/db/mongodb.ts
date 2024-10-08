import { Collection, MongoClient } from "mongodb";
import { SETTINGS } from "../settings";
import { BlogDbType } from "./blog-db-type";
import { PostDbType } from "./post-db-type";
import { UserDbType } from "./user-db-type";
import { CommentDbType } from "./comment-db-type";
import { MongoMemoryServer } from "mongodb-memory-server";
import { AuthSessionDbType } from "./auth-session-db-type";
import { ApiRequestDbType } from "./api-request-db-type";
import mongoose from "mongoose";


// const client: MongoClient = new MongoClient(SETTINGS.MONGO_DB.MONGO_URI)

// const db = client.db(SETTINGS.MONGO_DB.DB_NAME)
// export const blogsCollection: Collection<BlogDbType> = db.collection(SETTINGS.MONGO_DB.BLOG_COLLECTION_NAME)
// export const postsCollection: Collection<PostDbType> = db.collection(SETTINGS.MONGO_DB.POST_COLLECTION_NAME)

let client: MongoClient
let db
const dbName = SETTINGS.MONGO_DB.DB_NAME
export let blogsCollection: Collection<BlogDbType>
export let postsCollection: Collection<PostDbType>
export let usersCollection: Collection<UserDbType>
export let commentsCollection: Collection<CommentDbType>
export let authSessionsCollection: Collection<AuthSessionDbType>
export let apiRequestsCollection: Collection<ApiRequestDbType>

export async function runDb(mongoMemoryServer = false) {
    if (mongoMemoryServer) {
        const server = await MongoMemoryServer.create()
        const uri = server.getUri()

        client = new MongoClient(uri)

    } else {
        client = new MongoClient(SETTINGS.MONGO_DB.MONGO_URI)
    }

    db = client.db(SETTINGS.MONGO_DB.DB_NAME)
    blogsCollection = db.collection(SETTINGS.MONGO_DB.BLOG_COLLECTION_NAME)
    postsCollection = db.collection(SETTINGS.MONGO_DB.POST_COLLECTION_NAME)
    usersCollection = db.collection(SETTINGS.MONGO_DB.USER_COLLECTION_NAME)
    commentsCollection = db.collection(SETTINGS.MONGO_DB.COMMENT_COLLECTION_NAME)
    authSessionsCollection = db.collection(SETTINGS.MONGO_DB.AUTH_SESSION_COLLECTION_NAME)
    apiRequestsCollection = db.collection(SETTINGS.MONGO_DB.API_REQUESTS_COLLECTION_NAME)

    try {

        // await client.connect()
        await mongoose.connect(SETTINGS.MONGO_DB.MONGO_URI + "/" + dbName);

        // await client.db("blogs").command({ ping: 1 })
        console.log('dbName', dbName);

        console.log('Connected successfully to mongo server (mongoose)');

    } catch (e) {
        console.log("Can't connect to db");
        // await client.close()
        await mongoose.disconnect()
    }
}

export async function stop() {
    if (client) {
        await client.close()
    }
}

