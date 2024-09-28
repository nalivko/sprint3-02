import { Router } from "express";
import { authJWTMiddleware } from "../../global-middlewares/authJWTMiddleware";
import { deleteCommentController } from "./controllers/deleteCommentController";
import { getCommentController } from "./controllers/getCommentController";
import { updateCommentController } from "./controllers/updateCommentController";
import { commentValidators } from "./middlewares/commentValidators";

export const commentsRouter = Router({})

commentsRouter.get('/:id', getCommentController)
commentsRouter.put('/:commentId', authJWTMiddleware, commentValidators, updateCommentController)
commentsRouter.delete('/:commentId', authJWTMiddleware, deleteCommentController)