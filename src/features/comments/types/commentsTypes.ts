export type CommentInputModel = {
    content: string,
}

export type CommentViewModel = {
    id: string,
    content: string,
    commentatorInfo: CommentatorInfo,
    createdAt: string
}

type CommentatorInfo = {
    userId: string,
    userLogin: string
}

export type PostCommentsType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: Array<{}>
}