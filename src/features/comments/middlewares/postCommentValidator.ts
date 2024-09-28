import { body, param } from "express-validator";
import { checkErrorsMiddleware } from "../../../global-middlewares/checkErrorsMiddleware";
import { postsRepository } from "../../posts/posts-db-repository";

export const contentValidator =
    body('content')
        .isString()
        .withMessage('content must be a string')
        .trim().isLength({ min: 20, max: 300 })
        .withMessage('The content field length must be between 20 and 300 characters')

// export const postIdValidator =
//     param('postId')
//         .isMongoId()
//         .custom(async postId => {
//             const post = await postsRepository.getPostById(postId)

//             if (!post) {
//                 throw new Error('must be a post from posts table')
//             }

//             return true
//         })

export const postCommentValidators = [
    contentValidator,
    // postIdValidator,
    checkErrorsMiddleware
]