import { Router } from "express";
import { getBlogsController } from "./controllers/getBlogsController";
import { createBlogController } from "./controllers/createBlogController";
import { findBlogController } from "./controllers/findBLogController";
import { deleteBlogController } from "./controllers/deleteBlogController";
import { updateBlogController } from "./controllers/updateBlogController";
import { getPostsByBlogIdController } from "./controllers/getPostsByBlogIdController";
import { createPostByBlogIdController } from "./controllers/createPostByBlogIdController";
import { blogValidators } from "./middlewares/blogValidators";
import { queryValidator } from "../../global-middlewares/paginateValidator";
import { postValidators } from "../posts/middlewares/postValidators";
import { blogIdQueryMiddleware } from "./middlewares/blogIdQueryMiddleware";
import { authMiddleware } from "../../global-middlewares/authMiddleware";

export const blogsRouter = Router({})

blogsRouter.get('/', ...queryValidator, getBlogsController)
blogsRouter.post('/', ...blogValidators, createBlogController)
blogsRouter.get('/:blogId/posts', blogIdQueryMiddleware, ...queryValidator, getPostsByBlogIdController)
blogsRouter.post('/:blogId/posts', blogIdQueryMiddleware, ...postValidators, createPostByBlogIdController)
blogsRouter.get('/:id', findBlogController)
blogsRouter.put('/:id', ...blogValidators, updateBlogController)
blogsRouter.delete('/:id', authMiddleware, deleteBlogController)
