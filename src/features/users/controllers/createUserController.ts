import { Request, Response } from "express"
import { usersService } from "../services/users-service"
import { UserInputModel, UserViewModel } from "../types/users-type"
import { result } from "../services/users-service"

export const createUserController = async (req: Request<{}, {}, UserInputModel>, res: Response) => {
    const result = await usersService.createUser(req.body)

    if(result.status === '400') {
        res.status(400).send(result.errorMessages);
        return
    }
    
    res.status(201).send(result.data)
}