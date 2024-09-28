import { blogsQueryParamsType } from "../../helpers/helper"
import { blogsCollection } from "../../db/mongodb"
import { blogsRepository } from "./blogs-db-repository"
import { BlogsViewCollectionModel } from "./types/blogs-types"

export const blogsQueryRepository = {
    async findBlogs(queryParams: blogsQueryParamsType): Promise<BlogsViewCollectionModel> {

        const searchFilter = this.getSearchFilter(queryParams.searchNameTerm)

        const items = await blogsCollection
            .find(searchFilter)
            .sort(queryParams.sortBy, queryParams.sortDirection)
            .skip((queryParams.pageNumber - 1) * queryParams.pageSize)
            .limit(queryParams.pageSize)
            .toArray()

        const totalCount = await blogsCollection.countDocuments(searchFilter)

        return {
            pagesCount: Math.ceil(totalCount / queryParams.pageSize),
            page: queryParams.pageNumber,
            pageSize: queryParams.pageSize,
            totalCount,
            items: items.map(blogsRepository.mapBlog)
        }
    },

    getSearchFilter(searchNameTerm: string | null) {
        return searchNameTerm
            ? { name: { $regex: searchNameTerm, $options: 'i' } }
            : {}
    }
}

// const result = await ordersCollection.find().skip((page-1) * pageSize).limit(pageSize ).toArray()

// {address: {city: 'Batumi'}}

//rejects

//async
// await client.connect()
// async
// await client.close()