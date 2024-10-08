import { blogsQueryParamsType } from "../../helpers/helper"
import { blogsRepository } from "./blogs-db-repository"
import { BlogModelClass } from "./domain/blog.entity"

export const blogsQueryRepository = {
    async findBlogs(queryParams: blogsQueryParamsType): Promise<any> {

        const sortField = queryParams.sortBy

        const items = await BlogModelClass.find({})
            .where('name')
            .regex(queryParams.searchNameTerm ?? '')
            .sort({ [sortField]: queryParams.sortDirection })
            .limit(queryParams.pageSize)
            .skip((queryParams.pageNumber - 1) * queryParams.pageSize)

        const totalCount = await BlogModelClass.countDocuments({ name: new RegExp(queryParams.searchNameTerm ?? '', 'i') })

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
