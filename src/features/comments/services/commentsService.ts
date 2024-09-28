import { request } from "express"
import { setCommentsQueryParams } from "../../../helpers/helper"
import { ResultStatus } from "../../../types/resultCodes"
import { Result } from "../../../types/resultType"
import { commentsQueryRepository } from "../repositories/commentsQueryRepository"
import { commentsRepository } from "../repositories/commentsRepository"
import { CommentInputModel, CommentViewModel } from "../types/commentsTypes"

type UserType = {
    login: string,
    userId: string
}

export const commentService = {
    async findComments(query: { [key: string]: string | undefined }, postId: string) {
        const queryParams = setCommentsQueryParams(query)

        return await commentsQueryRepository.findComments(queryParams, postId)
    },

    async cretePostComment(postId: string, comment: string, user: UserType): Promise<CommentViewModel> {
        const newComment = {
            postId,
            content: comment,
            commentatorInfo: {
                userId: user.userId,
                userLogin: user.login
            },
            createdAt: new Date().toISOString(),
        }

        return await commentsRepository.createComment(newComment)
    },

    async updateComment(id: string, data: CommentInputModel, userId: string): Promise<Result<CommentViewModel | null>> {
        const comment = await commentsRepository.getCommentById(id)

        if(!comment) {
            return {
                status: ResultStatus.NotFound,
                data: null
            }
        }

        if (comment.commentatorInfo.userId !== userId) {
            return {
                status: ResultStatus.Forbidden,
                data: null
            }
        }
        
        const result = await commentsRepository.updateComment(id, data)
        
        if (result) {
            return {
                status: ResultStatus.NoContent,
                data: null
            }
        } else {
            return {
                status: ResultStatus.NotFound,
                data: null
            }
        }
    },

    async deleteComment(id: string, userId: string): Promise<Result<CommentViewModel | null>> {
        const comment = await commentsRepository.getCommentById(id)
        
        if(!comment) {
            return {
                status: ResultStatus.NotFound,
                data: null
            }
        }

        if (comment.commentatorInfo.userId !== userId) {
            return {
                status: ResultStatus.Forbidden,
                data: null
            }
        }
        const result = await commentsRepository.deleteComment(id)

        if (result) {
            return {
                status: ResultStatus.NoContent,
                data: null
            }
        } else {
            return {
                status: ResultStatus.NotFound,
                data: null
            }
        }
    },
}