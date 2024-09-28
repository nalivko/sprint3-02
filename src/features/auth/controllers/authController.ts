import { Request, Response } from "express"
import { userQueryRepository } from "../../users/usersQueryRepository"

export const authController = async (req: Request, res: Response) => {
    const userId = req.user?.userId
    
    if (!userId) return res.status(401)

    const me = await userQueryRepository.getUserById(userId)

    return res.status(200).send({email: me?.email, login: me?.login, userId})
}