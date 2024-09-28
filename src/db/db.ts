import { BlogDbType } from "./blog-db-type"
import { PostDbType } from "./post-db-type"

export type DBType = {
    blogs: BlogDbType [],
    posts: PostDbType []
}

export const db: DBType = {
    blogs: [],
    posts: []
}

export type ReadonlyDBType = { // тип для dataset
    blogs: Readonly<BlogDbType[]>
    posts: Readonly<PostDbType[]>
    // some: any[]
}

export const setDB = (dataset?: Partial<ReadonlyDBType>) => {
    if(!dataset) {
        db.blogs = []
        db.posts = []

        return
    }

    db.blogs = dataset.blogs?.map(blog => ({...blog})) || db.blogs
    db.posts = dataset.posts?.map(post => ({...post})) || db.posts
}