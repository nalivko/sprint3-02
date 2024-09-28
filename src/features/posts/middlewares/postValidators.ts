import { body } from "express-validator";
import { authMiddleware } from "../../../global-middlewares/authMiddleware";
import { checkErrorsMiddleware } from "../../../global-middlewares/checkErrorsMiddleware";
import { blogsRepository } from "../../blogs/blogs-db-repository";

export const titleValidator =
    body('title')
        .isString()
        .withMessage('title must be a string')
        .trim().isLength({ min: 1, max: 30 })
        .withMessage('The title length must be between 1 and 30 characters')

export const shortDescriptionValidator =
    body('shortDescription')
        .isString()
        .withMessage('short description must be a string')
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('The short description length must be between 1 and 100 characters')

export const contentValidator =
    body('content')
        .isString()
        .withMessage('content must be a string')
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('The content length must be between 1 and 1000 characters')

export const blogIdValidator =
    body('blogId')
        .isString()
        .withMessage('not string')
        .trim()
        .custom(async blogId => {
            const blog = await blogsRepository.getBlogById(blogId)

            if (!blog) {
                throw new Error('must be a blog from blogs table')
            }

            return true
        })



export const postValidators = [
    authMiddleware,
    titleValidator,
    shortDescriptionValidator,
    contentValidator,
    checkErrorsMiddleware
]