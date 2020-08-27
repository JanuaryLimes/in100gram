import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  email: Scalars['String']
  createdAt: Scalars['Int']
}

export type SignUpInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type SignInInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type SignUpPayload = {
  __typename?: 'SignUpPayload'
  user: User
}

export type SignInPayload = {
  __typename?: 'SignInPayload'
  user: User
}

export type Query = {
  __typename?: 'Query'
  user: User
  users: Array<Maybe<User>>
  viewer?: Maybe<User>
}

export type QueryUserArgs = {
  id: Scalars['ID']
}

export type Mutation = {
  __typename?: 'Mutation'
  signUp: SignUpPayload
  signIn: SignInPayload
  signOut: Scalars['Boolean']
}

export type MutationSignUpArgs = {
  input: SignUpInput
}

export type MutationSignInArgs = {
  input: SignInInput
}

export type ViewerQueryVariables = Exact<{ [key: string]: never }>

export type ViewerQuery = { __typename?: 'Query' } & {
  viewer?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'email'>>
}

export const ViewerDocument = gql`
  query Viewer {
    viewer {
      id
      email
    }
  }
`

/**
 * __useViewerQuery__
 *
 * To run a query within a React component, call `useViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewerQuery({
 *   variables: {
 *   },
 * });
 */
export function useViewerQuery(
  baseOptions?: Apollo.QueryHookOptions<ViewerQuery, ViewerQueryVariables>
) {
  return Apollo.useQuery<ViewerQuery, ViewerQueryVariables>(
    ViewerDocument,
    baseOptions
  )
}
export function useViewerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ViewerQuery, ViewerQueryVariables>
) {
  return Apollo.useLazyQuery<ViewerQuery, ViewerQueryVariables>(
    ViewerDocument,
    baseOptions
  )
}
export type ViewerQueryHookResult = ReturnType<typeof useViewerQuery>
export type ViewerLazyQueryHookResult = ReturnType<typeof useViewerLazyQuery>
export type ViewerQueryResult = Apollo.QueryResult<
  ViewerQuery,
  ViewerQueryVariables
>
