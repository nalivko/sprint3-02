import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"
import { BlogInputModel } from "../features/blogs/types/blogs-types"
import { PostInputModel } from "../features/posts/types/posts-types"
import { ErrorsMessagesType } from "../types/errorsMessagesType"

export type FieldNamesType = keyof BlogInputModel | keyof PostInputModel
// const f: FieldsType = 'some' // error
export type OutputErrorsType = {
    errorsMessages: {message: string, field: FieldNamesType}[]
}

export const checkErrorsMiddleware = (req: Request, res: Response<OutputErrorsType>, next: NextFunction) => {
    // const errors = validationResult(req).array({onlyFirstError: true})
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const errorsArray = errors.array({onlyFirstError: true}) as { path: FieldNamesType, msg: string }[]
        // const errorsArray = errors
        // res.send(errorsArray)
        
        res.status(400).json({ errorsMessages: errorsArray.map(err => ({message: err.msg, field: err.path})) })
        return
    } else {
        next()
    }
}