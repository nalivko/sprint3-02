import { req } from '../helpers/test-helpers'
import { runDb, stop } from '../../src/db/mongodb'
import { SETTINGS } from '../../src/settings'
import { codedAuth } from '../helpers/datasets'
import { testSeeder } from '../test.seeder'
import { createPost } from './utils/createPosts'
import { createBlog } from './utils/createBlogs'

describe('/posts', () => {

    beforeAll(async () => {
        await runDb(true)
    })

    afterAll(async () => {
        stop()
    })


    let postDto: any
    let updatePostDto: any
    let createdPost: any

    it('should return 200 and empty array', async () => {
        let emptyCollection = { pagesCount: 0, page: 1, pageSize: 10, totalCount: 0, items: [] }
        const res = await req
            .get(SETTINGS.PATH.POSTS)
            .expect(200, emptyCollection)
    })

    it('should create new post', async () => {
        const blog = await createBlog(req)
        postDto = testSeeder.createPostDTO(blog.id)

        await req
            .post(SETTINGS.PATH.POSTS)
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .send(postDto)
            .expect(201)

        const res = await req
            .get(SETTINGS.PATH.POSTS)
            .expect(200)

        expect(res.body.items.length).toEqual(1)
        expect(res.body.items[0].title).toEqual(postDto.title)
        expect(res.body.items[0].shortDescription).toEqual(postDto.shortDescription)
        expect(res.body.items[0].content).toEqual(postDto.content)
        expect(res.body.items[0].blogId).toEqual(postDto.blogId)

    })

    it('shouldn\'t create new post with incorrect input data', async () => {
        await req
            .post(SETTINGS.PATH.POSTS)
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .send({ title: 'post title' })
            .expect(400)
    })

    it('shouldn\'t create new post with incorrect input data', async () => {
        const blog = await createBlog(req)
        const incorrectPostDTO = testSeeder.createIncorrectPostDTO(blog.id)
        await req
            .post(SETTINGS.PATH.POSTS)
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .send(incorrectPostDTO)
            .expect(400)
    })

    it('should find post by id', async () => {
        createdPost = await createPost(req)

        const res = await req
            .get(SETTINGS.PATH.POSTS + `/${createdPost.id}`)
            .expect(200)

        expect(res.body.title).toEqual(createdPost.title)
    })

    it('shouldn\'t find post by id', async () => {
        const res = await req
            .get(SETTINGS.PATH.POSTS + '/66a219d1c4b28d27b92bba21')
            .expect(404)
    })

    it('should update post by id', async () => {
        updatePostDto = testSeeder.updatePostDTO(createdPost.blogId)
        await req
            .put(SETTINGS.PATH.POSTS + `/${createdPost.id}`)
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .send(updatePostDto)
            .expect(204)

        const res = await req
            .get(SETTINGS.PATH.POSTS + `/${createdPost.id}`)
            .expect(200)

        expect(res.body.title).toEqual(updatePostDto.title)
        expect(res.body.shortDescription).toEqual(updatePostDto.shortDescription)
        expect(res.body.content).toEqual(updatePostDto.content)
        expect(res.body.blogId).toEqual(updatePostDto.blogId)
    })

    it('shouldn\'t update post without authorization', async () => {
        updatePostDto = testSeeder.updateBlogDTO()
        await req
            .put(SETTINGS.PATH.POSTS + `/${createdPost.id}`)
            .send(updatePostDto)
            .expect(401)
    })

    it('shouldn\'t update post with incorrect data', async () => {
        updatePostDto = testSeeder.updateBlogDTO()
        await req
            .put(SETTINGS.PATH.POSTS + `/${createdPost.id}`)
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .send({})
            .expect(400)
    })

    it('shouldn\'t delete post with incorrect id', async () => {
        await req
            .delete(SETTINGS.PATH.POSTS + '/66a219d1c4b28d27b92bba21')
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .expect(404)
    })

    it('shouldn\'t delete blog without authorization', async () => {
        await req
            .delete(SETTINGS.PATH.POSTS + `/${createdPost.id}`)
            .expect(401)
    })

    it('should delete post by id', async () => {
        await req
            .delete(SETTINGS.PATH.POSTS + `/${createdPost.id}`)
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .expect(204)

        await req
            .get(SETTINGS.PATH.POSTS + `/${createdPost.id}`)
            .expect(404)
    })


})