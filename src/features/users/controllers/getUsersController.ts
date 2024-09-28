import { Request, Response } from "express"
import { userQueryRepository } from "../usersQueryRepository"
import { UsersViewCollectionModels } from "../types/users-type"

export const getUsersController = async (req: Request, res: Response<UsersViewCollectionModels>) => {
    const users = await userQueryRepository.getUsers(req.query as { [key: string]: string | undefined })

    return res.send(users)
}