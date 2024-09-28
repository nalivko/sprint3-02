import { ObjectId } from "mongodb";
import { CommentDbType } from "../../../db/comment-db-type";
import { commentsCollection } from "../../../db/mongodb";
import { commentsQueryParamsType } from "../../../helpers/helper";
import { CommentViewModel } from "../types/commentsTypes";

export const commentsQueryRepository = {
    async findComments(queryParams: commentsQueryParamsType, postId: string) {
        const items = await commentsCollection
            .find({postId})
            .sort(queryParams.sortBy, queryParams.sortDirection)
            .skip((queryParams.pageNumber - 1) * queryParams.pageSize)
            .limit(queryParams.pageSize)
            .toArray()

        const totalCount = await commentsCollection.countDocuments({postId})

        return {
            pagesCount: Math.ceil(totalCount / queryParams.pageSize),
            page: queryParams.pageNumber,
            pageSize: queryParams.pageSize,
            totalCount,
            items: items.map(this.mapComment)
        }
    },

    async getCommentById(id: string): Promise<CommentViewModel | null> {
        let comment = await commentsCollection.findOne({_id: new ObjectId(id)})
        
        return comment ? this.mapComment(comment) : null
    },

    mapComment(comment: CommentDbType) {
        return {
            id: comment._id!.toString(),
            content: comment.content,
            commentatorInfo: comment.commentatorInfo,
            createdAt: comment.createdAt
        }
    }
} 