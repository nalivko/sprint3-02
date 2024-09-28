import { SortDirection } from "mongodb"

export type blogsQueryParamsType = {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: SortDirection,
    searchNameTerm: string | null
}

export const setBlogsQueryParams = (query: { [key: string]: string | undefined }): blogsQueryParamsType => {
    return {
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize ? +query.pageSize : 10,
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
        searchNameTerm: query.searchNameTerm ? query.searchNameTerm : null
    }
}

export type postsQueryParamsType = {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: SortDirection
}

export const setPostsQueryParams = (query: { [key: string]: string | undefined }): postsQueryParamsType => {
    return {
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize ? +query.pageSize : 10,
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc'
    }
}

export type usersQueryParamsType = {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: SortDirection,
    searchLoginTerm: string | null,
    searchEmailTerm: string | null
}

export const setUsersQueryParams = (query: { [key: string]: string | undefined }): usersQueryParamsType => {
    return {
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize ? +query.pageSize : 10,
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
        searchLoginTerm: query.searchLoginTerm ? query.searchLoginTerm : null,
        searchEmailTerm: query.searchEmailTerm ? query.searchEmailTerm : null
    }
}

export const setCommentsQueryParams = (query: { [key: string]: string | undefined }): commentsQueryParamsType => {
    return {
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize ? +query.pageSize : 10,
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
    }
}

export type commentsQueryParamsType = {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: SortDirection
}