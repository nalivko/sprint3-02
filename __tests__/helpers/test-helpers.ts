import {app} from '../../src/app'
import {agent} from 'supertest'

export const req = agent(app)

export const createString = (stringLength: number) => {
    let string = ''
    while (string.length < stringLength) {
        string += 'a'
    }
    return string
}