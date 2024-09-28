import { req } from '../helpers/test-helpers'
import { runDb, stop } from '../../src/db/mongodb'
import { SETTINGS } from '../../src/settings'
import { codedAuth } from '../helpers/datasets'
import { testSeeder } from '../test.seeder'
import { createUser } from './utils/createUsers'
import { access } from 'fs/promises'

jest.setTimeout(10000)

describe('/security', () => {

    beforeAll(async () => {
        await runDb(true)
    })

    afterAll(async () => {
        stop()
    })


    let userDto: any
    let createdUser: any

    it('should login users at 4th', async () => {
        let user = { login: "user02", password: "qwerty02", email: "email2@gmail.com" }

        await req
            .post('/auth/registration')
            .send(user)
            .expect(204)

        const device1 = await req
            .post('/auth/login')
            .send({
                "loginOrEmail": user.login,
                "password": user.password
            })
            .expect(200)

        // const accessToken = device1.body.accessToken
        const refreshToken1 = device1.headers['set-cookie'][0].split('=')[1]
        // console.log('refresh', device1.headers['set-cookie'][0]);

        const device2 = await req
            .post('/auth/login')
            .set('user-agent', 'device2')
            .send({
                "loginOrEmail": user.login,
                "password": user.password
            })
            .expect(200)

        const refreshToken2 = device2.headers['set-cookie'][0].split('=')[1]

        const device3 = await req
            .post('/auth/login')
            .set('user-agent', 'device3')
            .send({
                "loginOrEmail": user.login,
                "password": user.password
            })
            .expect(200)

        const refreshToken3 = device3.headers['set-cookie'][0].split('=')[1]

        const device4 = await req
            .post('/auth/login')
            .set('user-agent', 'device4')
            .send({
                "loginOrEmail": user.login,
                "password": user.password
            })
            .expect(200)

        const refreshDevice1 = await req
            .post('/auth/refresh-token')
            .set('Cookie', ['refreshToken=' + refreshToken1])
            .expect(200)

        const newAccessToken = refreshDevice1.body.accessToken
        const newRefreshToken1 = refreshDevice1.headers['set-cookie'][0].split('=')[1]
        console.log('newRefreshToken1', newRefreshToken1);
        

        let activeDevices = await req
            .get('/security/devices')
            .set('Authorization', 'Bearer ' + newAccessToken)
            .expect(200)

        console.log(activeDevices.body);
        // console.log(activeDevices.body.length);
        expect(activeDevices.body.length).toBe(4)

        // console.log(activeDevices.body[1].deviceId);

        await req
            .delete('/security/devices/' + activeDevices.body[1].deviceId)
            .set('Authorization', 'Bearer ' + newAccessToken)
            .expect(204)

        activeDevices = await req
            .get('/security/devices')
            .set('Authorization', 'Bearer ' + newAccessToken)
            .expect(200)

        expect(activeDevices.body.length).toBe(3)

        const refreshDevice2 = await req
            .post('/auth/refresh-token')
            .set('Cookie', ['refreshToken=' + refreshToken2])
            .expect(401)

        const logoutDevice3 = await req
            .post('/auth/logout')
            .set('Cookie', ['refreshToken=' + refreshToken3])
            .expect(204)

        activeDevices = await req
            .get('/security/devices')
            .set('Authorization', 'Bearer ' + newAccessToken)
            .expect(200)

        expect(activeDevices.body.length).toBe(2)

        await req
            .delete('/security/devices')
            .set('Authorization', 'Bearer ' + newAccessToken)
            .set('Cookie', ['refreshToken=' + refreshToken1])
            .expect(204)

        activeDevices = await req
            .get('/security/devices')
            .set('Authorization', 'Bearer ' + newAccessToken)
            .expect(200)

        expect(activeDevices.body.length).toBe(1)
    })



})