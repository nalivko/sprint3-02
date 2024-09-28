import { body, check, query } from "express-validator";
import { authMiddleware } from "../../../global-middlewares/authMiddleware";
import { checkErrorsMiddleware } from "../../../global-middlewares/checkErrorsMiddleware";

// check(fields?: string | string[], message?: any): ValidationChain
export const paginateValidator =
    check(['pagesCount', 'page', 'pageSize', 'totalCount'])
        .isInt({ min: 0 })
        .withMessage('The pagesCount must be integer')
        .optional({ nullable: true })

// export const pagesCountValidator =
//     query('pagesCount')
//         .isInt({ min: 0 })
//         .withMessage('The pagesCount must be integer')
//         .optional({ nullable: true })

// export const pageValidator =
//     query('page')
//         .isInt({ min: 0 })
//         .withMessage('The page must be integer')
//         .optional({ nullable: true })

// export const pageSizeValidator =
//     query('pageSize')
//         .isInt({ min: 0 })
//         .withMessage('The pageSize must be integer')
//         .optional({ nullable: true })

// export const totalCountValidator =
//     query('totalCount')
//         .isInt({ min: 0 })
//         .withMessage('The totalCount must be integer')
//         .optional({ nullable: true })

export const sortDirectionValidator =
    query('sortDirection')
        .isString()
        .isIn(['asc', 'desc'])
        .withMessage('The sortDirection must be desc or asc')
        .optional({ nullable: true })

export const nameValidator =
    body('name')
        .isString().withMessage('name must be a string')
        .trim()
        .isLength({ min: 1, max: 15 }).withMessage('The name length must be between 1 and 15 characters')

export const descriptionValidator =
    body('description')
        .isString().withMessage('description must be a string')
        .trim()
        .isLength({ min: 1, max: 500 }).withMessage('The name length must be between 1 and 500 characters')

export const websiteUrlValidator =
    body('websiteUrl')
        .isString().withMessage('website url must be a string')
        .trim()
        .isURL().withMessage('website url must be valid url')
        .matches('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$').withMessage('pattern')
        .isLength({ min: 1, max: 100 }).withMessage('The website url length must be between 1 and 100 characters')


export const blogValidators = [
    authMiddleware,
    nameValidator,
    descriptionValidator,
    websiteUrlValidator,
    checkErrorsMiddleware
]