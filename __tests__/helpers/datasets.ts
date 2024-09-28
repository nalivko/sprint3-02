import {DBType} from '../../src/db/db'
import { ObjectId } from 'mongodb'
import {BlogDbType} from '../../src/db/blog-db-type'
// import {PostDbType} from '../../src/db/post-db-type'
import {fromUTF8ToBase64} from '../../src/global-middlewares/authMiddleware'
import {SETTINGS} from '../../src/settings'

export const codedAuth = fromUTF8ToBase64(SETTINGS.ADMIN_AUTH)

export const createString = (length: number) => {
    let s = ''
    for (let x = 1; x <= length; x++) {
        s += x % 10
    }
    return s
}

export const blog = {
    name: 'n1',
    description: 'd1',
    websiteUrl: 'https://some.com'
}

export const blog1: BlogDbType = {
    _id: new ObjectId(),
    name: 'n1',
    description: 'd1',
    websiteUrl: 'http://some.com',
    createdAt: new Date().toISOString(),
    isMembership: false
} as const // dataset нельзя изменять
// blog1.name = 'n2' // error!!!

// export const blog7: BlogDbType = {
//     id: new Date().toISOString() + Math.random(),
//     name: 'n7',
//     description: 'd7',
//     websiteUrl: 'http://some7.com',
//     createdAt: new Date().toISOString(),
//     isMembership: false
// } as const // dataset нельзя изменять

// export const post1: PostDbType = {
//     id: new Date().toISOString() + Math.random(),
//     title: 't1',
//     content: 'c1',
//     shortDescription: 's1',
//     blogId: blog1.id,
//     blogName: 'n1',
//     createdAt: new Date().toISOString()
// } as const // dataset нельзя изменять

export const dataset1: DBType= {
    blogs: [blog1],
    posts: [],
} as const // dataset нельзя изменять

// export const dataset2: DBType = {
//     blogs: [blog1, blog7],
//     posts: [post1],
// } as const 