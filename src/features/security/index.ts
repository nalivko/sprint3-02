import { Router } from 'express'
import { refreshTokenMiddleware } from '../../global-middlewares/refreshTokenMiddleware'
import { deleteAllDevicesController } from './controllers/deleteAllDevicesController'
import { deleteDeviceController } from './controllers/deleteDeviceController'
import { getDevicesController } from './controllers/getDevicesController'

export const securityRouter = Router({})

securityRouter.get('/devices', refreshTokenMiddleware, getDevicesController)
securityRouter.delete('/devices', refreshTokenMiddleware, deleteAllDevicesController)
securityRouter.delete('/devices/:id', refreshTokenMiddleware, deleteDeviceController)