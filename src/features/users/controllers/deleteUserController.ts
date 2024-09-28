import { Request, Response } from "express"
import { usersService } from "../services/users-service"

export const deleteUserController = async (req: Request<{id: string}>, res: Response) => {    
    const isDeleted = await usersService.deleteUser(req.params.id)

    return isDeleted ? res.sendStatus(204) : res.sendStatus(404)
}