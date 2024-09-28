export type BlogInputModel = {
    name: string,
    description: string,
    websiteUrl: string
}

export type BlogViewModel = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}

export type BlogsViewCollectionModel = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: Array<BlogViewModel>
  }