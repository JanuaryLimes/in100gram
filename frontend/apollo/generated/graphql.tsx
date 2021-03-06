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
  photoUrl?: Maybe<Scalars['String']>
  displayName: Scalars['String']
}

export type UserInfo = {
  __typename?: 'UserInfo'
  id: Scalars['ID']
  email: Scalars['String']
  createdAt: Scalars['Int']
  photoUrl?: Maybe<Scalars['String']>
  displayName: Scalars['String']
  postsCount: Scalars['Int']
  followers: Array<Maybe<User>>
  following: Array<Maybe<User>>
}

export type SignUpInput = {
  email: Scalars['String']
  password: Scalars['String']
  displayName: Scalars['String']
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
  user?: Maybe<UserInfo>
  users: Array<Maybe<User>>
  viewer?: Maybe<User>
}

export type QueryUserArgs = {
  displayName: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  signUp: SignUpPayload
  signIn: SignInPayload
  signOut: Scalars['Boolean']
  follow?: Maybe<UserInfo>
  unfollow?: Maybe<UserInfo>
}

export type MutationSignUpArgs = {
  input: SignUpInput
}

export type MutationSignInArgs = {
  input: SignInInput
}

export type MutationFollowArgs = {
  userId: Scalars['ID']
  follow: Scalars['ID']
}

export type MutationUnfollowArgs = {
  userId: Scalars['ID']
  follow: Scalars['ID']
}

export type FollowMutationVariables = Exact<{
  userId: Scalars['ID']
  follow: Scalars['ID']
}>

export type FollowMutation = { __typename?: 'Mutation' } & {
  follow?: Maybe<
    { __typename?: 'UserInfo' } & Pick<
      UserInfo,
      'id' | 'email' | 'photoUrl' | 'displayName' | 'postsCount'
    > & {
        followers: Array<
          Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'displayName'>>
        >
        following: Array<
          Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'displayName'>>
        >
      }
  >
}

export type UnfollowMutationVariables = Exact<{
  userId: Scalars['ID']
  follow: Scalars['ID']
}>

export type UnfollowMutation = { __typename?: 'Mutation' } & {
  unfollow?: Maybe<
    { __typename?: 'UserInfo' } & Pick<
      UserInfo,
      'id' | 'email' | 'photoUrl' | 'displayName' | 'postsCount'
    > & {
        followers: Array<
          Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'displayName'>>
        >
        following: Array<
          Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'displayName'>>
        >
      }
  >
}

export type SignInMutationMutationVariables = Exact<{
  email: Scalars['String']
  password: Scalars['String']
}>

export type SignInMutationMutation = { __typename?: 'Mutation' } & {
  signIn: { __typename?: 'SignInPayload' } & {
    user: { __typename?: 'User' } & Pick<User, 'id' | 'email'>
  }
}

export type SignUpMutationMutationVariables = Exact<{
  email: Scalars['String']
  password: Scalars['String']
  displayName: Scalars['String']
}>

export type SignUpMutationMutation = { __typename?: 'Mutation' } & {
  signUp: { __typename?: 'SignUpPayload' } & {
    user: { __typename?: 'User' } & Pick<User, 'id' | 'email'>
  }
}

export type UserQueryVariables = Exact<{
  displayName: Scalars['String']
}>

export type UserQuery = { __typename?: 'Query' } & {
  user?: Maybe<
    { __typename?: 'UserInfo' } & Pick<
      UserInfo,
      'id' | 'email' | 'photoUrl' | 'displayName' | 'postsCount'
    > & {
        followers: Array<
          Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'displayName'>>
        >
        following: Array<
          Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'displayName'>>
        >
      }
  >
}

export type ViewerQueryVariables = Exact<{ [key: string]: never }>

export type ViewerQuery = { __typename?: 'Query' } & {
  viewer?: Maybe<
    { __typename?: 'User' } & Pick<
      User,
      'id' | 'email' | 'photoUrl' | 'displayName'
    >
  >
}

export const FollowDocument = gql`
  mutation Follow($userId: ID!, $follow: ID!) {
    follow(userId: $userId, follow: $follow) {
      id
      email
      photoUrl
      displayName
      postsCount
      followers {
        id
        displayName
      }
      following {
        id
        displayName
      }
    }
  }
`
export type FollowMutationFn = Apollo.MutationFunction<
  FollowMutation,
  FollowMutationVariables
>

/**
 * __useFollowMutation__
 *
 * To run a mutation, you first call `useFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followMutation, { data, loading, error }] = useFollowMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      follow: // value for 'follow'
 *   },
 * });
 */
export function useFollowMutation(
  baseOptions?: Apollo.MutationHookOptions<
    FollowMutation,
    FollowMutationVariables
  >
) {
  return Apollo.useMutation<FollowMutation, FollowMutationVariables>(
    FollowDocument,
    baseOptions
  )
}
export type FollowMutationHookResult = ReturnType<typeof useFollowMutation>
export type FollowMutationResult = Apollo.MutationResult<FollowMutation>
export type FollowMutationOptions = Apollo.BaseMutationOptions<
  FollowMutation,
  FollowMutationVariables
>
export const UnfollowDocument = gql`
  mutation Unfollow($userId: ID!, $follow: ID!) {
    unfollow(userId: $userId, follow: $follow) {
      id
      email
      photoUrl
      displayName
      postsCount
      followers {
        id
        displayName
      }
      following {
        id
        displayName
      }
    }
  }
`
export type UnfollowMutationFn = Apollo.MutationFunction<
  UnfollowMutation,
  UnfollowMutationVariables
>

/**
 * __useUnfollowMutation__
 *
 * To run a mutation, you first call `useUnfollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowMutation, { data, loading, error }] = useUnfollowMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      follow: // value for 'follow'
 *   },
 * });
 */
export function useUnfollowMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UnfollowMutation,
    UnfollowMutationVariables
  >
) {
  return Apollo.useMutation<UnfollowMutation, UnfollowMutationVariables>(
    UnfollowDocument,
    baseOptions
  )
}
export type UnfollowMutationHookResult = ReturnType<typeof useUnfollowMutation>
export type UnfollowMutationResult = Apollo.MutationResult<UnfollowMutation>
export type UnfollowMutationOptions = Apollo.BaseMutationOptions<
  UnfollowMutation,
  UnfollowMutationVariables
>
export const SignInMutationDocument = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      user {
        id
        email
      }
    }
  }
`
export type SignInMutationMutationFn = Apollo.MutationFunction<
  SignInMutationMutation,
  SignInMutationMutationVariables
>

/**
 * __useSignInMutationMutation__
 *
 * To run a mutation, you first call `useSignInMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutationMutation, { data, loading, error }] = useSignInMutationMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignInMutationMutation,
    SignInMutationMutationVariables
  >
) {
  return Apollo.useMutation<
    SignInMutationMutation,
    SignInMutationMutationVariables
  >(SignInMutationDocument, baseOptions)
}
export type SignInMutationMutationHookResult = ReturnType<
  typeof useSignInMutationMutation
>
export type SignInMutationMutationResult = Apollo.MutationResult<
  SignInMutationMutation
>
export type SignInMutationMutationOptions = Apollo.BaseMutationOptions<
  SignInMutationMutation,
  SignInMutationMutationVariables
>
export const SignUpMutationDocument = gql`
  mutation SignUpMutation(
    $email: String!
    $password: String!
    $displayName: String!
  ) {
    signUp(
      input: { email: $email, password: $password, displayName: $displayName }
    ) {
      user {
        id
        email
      }
    }
  }
`
export type SignUpMutationMutationFn = Apollo.MutationFunction<
  SignUpMutationMutation,
  SignUpMutationMutationVariables
>

/**
 * __useSignUpMutationMutation__
 *
 * To run a mutation, you first call `useSignUpMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutationMutation, { data, loading, error }] = useSignUpMutationMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      displayName: // value for 'displayName'
 *   },
 * });
 */
export function useSignUpMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignUpMutationMutation,
    SignUpMutationMutationVariables
  >
) {
  return Apollo.useMutation<
    SignUpMutationMutation,
    SignUpMutationMutationVariables
  >(SignUpMutationDocument, baseOptions)
}
export type SignUpMutationMutationHookResult = ReturnType<
  typeof useSignUpMutationMutation
>
export type SignUpMutationMutationResult = Apollo.MutationResult<
  SignUpMutationMutation
>
export type SignUpMutationMutationOptions = Apollo.BaseMutationOptions<
  SignUpMutationMutation,
  SignUpMutationMutationVariables
>
export const UserDocument = gql`
  query User($displayName: String!) {
    user(displayName: $displayName) {
      id
      email
      photoUrl
      displayName
      postsCount
      followers {
        id
        displayName
      }
      following {
        id
        displayName
      }
    }
  }
`

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      displayName: // value for 'displayName'
 *   },
 * });
 */
export function useUserQuery(
  baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>
) {
  return Apollo.useQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    baseOptions
  )
}
export function useUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>
) {
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    baseOptions
  )
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>
export const ViewerDocument = gql`
  query Viewer {
    viewer {
      id
      email
      photoUrl
      displayName
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
