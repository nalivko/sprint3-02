import { req } from '../helpers/test-helpers'
import { runDb, stop } from '../../src/db/mongodb'
import { SETTINGS } from '../../src/settings'
import { codedAuth } from '../helpers/datasets'
import { testSeeder } from '../test.seeder'
import { createBlog } from './utils/createBlogs'

// jest.setTimeout(8000)

describe('/blogs', () => {

    beforeAll(async () => {
        await runDb(true)
    })

    afterAll(async () => {
        stop()
    })


    let blogDto: any
    let updateBlogDto: any
    let createdBlog: any

    it('should return 200 and empty array', async () => {
        let emptyCollection = { pagesCount: 0, page: 1, pageSize: 10, totalCount: 0, items: [] }
        const res = await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200, emptyCollection)
    })

    it('should create new blog', async () => {
        blogDto = testSeeder.createBlogDTO()

        await req
            .post(SETTINGS.PATH.BLOGS)
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .send(blogDto)
            .expect(201)

        const res = await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200)

        expect(res.body.items.length).toEqual(1)
        expect(res.body.items[0].name).toEqual(blogDto.name)
        expect(res.body.items[0].description).toEqual(blogDto.description)
        expect(res.body.items[0].websiteUrl).toEqual(blogDto.websiteUrl)

    })

    it('shouldn\'t create new blog with incorrect input data', async () => {
        const incorrectBlogDTO = testSeeder.createIncorrectBlogDTO()
        await req
            .post(SETTINGS.PATH.BLOGS)
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .send(incorrectBlogDTO)
            .expect(400)
    })

    it('shouldn\'t create new blog with incorrect input data', async () => {
        await req
            .post(SETTINGS.PATH.BLOGS)
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .send({ name: 'blog name' })
            .expect(400)
    })

    it('should find blog by id', async () => {
        createdBlog = await createBlog(req)

        const res = await req
            .get(SETTINGS.PATH.BLOGS + `/${createdBlog.id}`)
            .expect(200)

        expect(res.body.name).toEqual(createdBlog.name)
    })

    it('shouldn\'t find blog by id', async () => {
        const res = await req
            .get(SETTINGS.PATH.BLOGS + '/66a219d1c4b28d27b92bba21')
            .expect(404)
    })

    it('should update blog by id', async () => {
        updateBlogDto = testSeeder.updateBlogDTO()
        await req
            .put(SETTINGS.PATH.BLOGS + `/${createdBlog.id}`)
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .send(updateBlogDto)
            .expect(204)

        const res = await req
            .get(SETTINGS.PATH.BLOGS + `/${createdBlog.id}`)
            .expect(200)

        expect(res.body.name).toEqual(updateBlogDto.name)
        expect(res.body.description).toEqual(updateBlogDto.description)
        expect(res.body.websiteUrl).toEqual(updateBlogDto.websiteUrl)
    })

    it('shouldn\'t update blog without authorization', async () => {
        updateBlogDto = testSeeder.updateBlogDTO()
        await req
            .put(SETTINGS.PATH.BLOGS + `/${createdBlog.id}`)
            .send(updateBlogDto)
            .expect(401)
    })

    it('shouldn\'t update blog with incorrect data', async () => {
        updateBlogDto = testSeeder.updateBlogDTO()
        await req
            .put(SETTINGS.PATH.BLOGS + `/${createdBlog.id}`)
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .send({})
            .expect(400)
    })

    it('shouldn\'t delete blog with incorrect id', async () => {
        await req
            .delete(SETTINGS.PATH.BLOGS + '/66a219d1c4b28d27b92bba21')
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .expect(404)
    })

    it('shouldn\'t delete blog without authorization', async () => {
        await req
            .delete(SETTINGS.PATH.BLOGS + `/${createdBlog.id}`)
            .expect(401)
    })

    it('should delete blog by id', async () => {
        await req
            .delete(SETTINGS.PATH.BLOGS + `/${createdBlog.id}`)
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .expect(204)

        await req
            .get(SETTINGS.PATH.BLOGS + `/${createdBlog.id}`)
            .expect(404)
    })


})