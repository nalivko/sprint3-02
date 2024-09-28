import { req } from '../helpers/test-helpers'
import { runDb, stop } from '../../src/db/mongodb'
import { SETTINGS } from '../../src/settings'
import { codedAuth } from '../helpers/datasets'
import { testSeeder } from '../test.seeder'
import { createUser } from './utils/createUsers'

describe('/blogs', () => {

    beforeAll(async () => {
        await runDb(true)
    })

    afterAll(async () => {
        stop()
    })


    let userDto: any
    let createdUser: any

    it('should return 200 and empty array', async () => {
        let emptyCollection = { pagesCount: 0, page: 1, pageSize: 10, totalCount: 0, items: [] }
        const res = await req
            .get(SETTINGS.PATH.USERS)
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .expect(200, emptyCollection)
    })

    it('should return 401 without authorization', async () => {
        await req
            .get(SETTINGS.PATH.USERS)
            .expect(401)
    })

    it('should create new user', async () => {
        userDto = testSeeder.createUserDTO()

        await req
            .post(SETTINGS.PATH.USERS)
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .send(userDto)
            .expect(201)

        const res = await req
            .get(SETTINGS.PATH.USERS)
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .expect(200)

        expect(res.body.items.length).toEqual(1)
        expect(res.body.items[0].name).toEqual(userDto.name)
        expect(res.body.items[0].description).toEqual(userDto.description)
        expect(res.body.items[0].websiteUrl).toEqual(userDto.websiteUrl)

    })

    it('shouldn\'t create user twice', async () => {
        userDto = testSeeder.createUserDTO()

        await req
            .post(SETTINGS.PATH.USERS)
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .send(userDto)
            .expect(400)
    })

    it('shouldn\'t create new user with incorrect input data', async () => {
        const incorrectUserDTO = testSeeder.createIncorrectUserDTO()
        await req
            .post(SETTINGS.PATH.USERS)
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .send(incorrectUserDTO)
            .expect(400)
    })


    it('shouldn\'t delete user with incorrect id', async () => {
        await req
            .delete(SETTINGS.PATH.USERS + '/66a219d1c4b28d27b92bba21')
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .expect(404)
    })

    it('shouldn\'t delete blog without authorization', async () => {
        createdUser = await createUser(req)
        await req
            .delete(SETTINGS.PATH.USERS + `/${createdUser.id}`)
            .expect(401)
    })

    it('should delete blog by id', async () => {
        await req
            .delete(SETTINGS.PATH.USERS + `/${createdUser.id}`)
            .set({ 'Authorization': 'Basic ' + codedAuth })
            .expect(204)

        await req
            .get(SETTINGS.PATH.USERS + `/${createdUser.id}`)
            .expect(404)
    })


})