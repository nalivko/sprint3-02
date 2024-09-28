import { Request, Response } from "express"
import { securityRepository } from "../repositories/securityRepository";
import { jwtService } from "../../../application/jwtService";

export const deleteDeviceController = async (req: Request<{id: string}>, res: Response) => {
    const refreshToken = req.cookies.refreshToken
    const verifiedToken = jwtService.verifyRefreshToken(refreshToken)
    const userId = verifiedToken!.userId
    const iat = verifiedToken!.iat!


    const device = await securityRepository.getDeviceById(req.params.id)

    if (!device) {
        res.send(404)
        return
    }

    if(device.userId !== userId) {
        res.send(403)
        return
    }
    
    const isDeleted = await securityRepository.deleteDeviceById(req.params.id, device.iat)

    if(isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }   
}