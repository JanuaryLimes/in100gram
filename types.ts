export const LoggedUserKey = 'loggedUser'

export type User = {
  email?: string
}

export type LoggedUserState = {
  loggedUser: User
}

export type AppState = {
  loggedUserState: LoggedUserState
}

export type LoggedUserStateActions =
  | { type: 'login'; payload: User }
  | { type: 'logout' }

export type MainProps = {
  postsData: PostProps[]
}

// TODO
export type UserModel = {
  name: string
  imageUrl: string
}

export type Comment = {
  author: UserModel
  comment: string
}

export type PostProps = {
  id: number
  author: UserModel
  comments: Comment[]
}

export type StackProps = {
  components: JSX.Element[]
  gap?: 2 | 4
}
