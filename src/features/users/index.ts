import { Router } from "express";
import { createUserController } from "./controllers/createUserController";
import { getUsersController } from "./controllers/getUsersController";
import { deleteUserController } from "./controllers/deleteUserController";
import { authMiddleware } from "../../global-middlewares/authMiddleware";
import { userValidators } from "./middlewares/userValidators";

export const usersRouter = Router({})

usersRouter.get('/', authMiddleware, getUsersController)
usersRouter.post('/', authMiddleware, ...userValidators, createUserController)
usersRouter.delete('/:id', authMiddleware, deleteUserController)