import { PostDbType } from "../../db/post-db-type"
import { postsRepository } from "./posts-db-repository"
import { postsCollection } from "../../db/mongodb"
import { postsQueryParamsType } from "../../helpers/helper"
import { ObjectId } from "mongodb"

export const postsQueryRepository = {

    async findPosts(queryParams: postsQueryParamsType, blogId?: string): Promise<{}> {
        const filter = blogId ? {blogId: new ObjectId(blogId)} : {}

        const items = await postsCollection
            .find(filter)
            .sort(queryParams.sortBy, queryParams.sortDirection)
            .skip((queryParams.pageNumber - 1) * queryParams.pageSize)
            .limit(queryParams.pageSize)
            .toArray()

        const totalCount = await postsCollection.countDocuments(filter)

        return {
            pagesCount: Math.ceil(totalCount / queryParams.pageSize),
            page: queryParams.pageNumber,
            pageSize: queryParams.pageSize,
            totalCount,
            items: items.map(postsRepository.mapPost)
        }
    },

}