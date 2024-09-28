import { query, check } from "express-validator";

const paginateValidator =
    check(['pagesCount', 'page', 'pageSize', 'totalCount'])
        .isInt({ min: 0 })
        .withMessage('The pagesCount must be integer')
        .optional({ nullable: true })

const sortDirectionsValidator =
    query('sortDirection')
        .isString()
        .isIn(['asc', 'desc'])
        .withMessage('The sortDirection must be desc or asc')
        .optional({ nullable: true })

export const queryValidator = [
    paginateValidator,
    sortDirectionsValidator
]