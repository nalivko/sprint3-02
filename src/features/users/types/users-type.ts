import { ObjectId } from "mongodb"

export type UserInputModel = {
  login: string,
  password: string,
  email: string
}

export type UserViewModel = {
  id: string
  login: string,
  email: string,
  createdAt: string
}

export type UsersViewCollectionModels = {
  pagesCount: number,
  page: number,
  pageSize: number,
  totalCount: number,
  items: Array<UserViewModel>
}