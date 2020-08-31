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

export type SignInMutationMutationVariables = Exact<{
  email: Scalars['String']
  password: Scalars['String']
}>

export type SignInMutationMutation = { __typename?: 'Mutation' } & {
  signIn: { __typename?: 'SignInPayload' } & {
    user: { __typename?: 'User' } & Pick<User, 'id' | 'email'>
  }
}

export type ViewerQueryVariables = Exact<{ [key: string]: never }>

export type ViewerQuery = { __typename?: 'Query' } & {
  viewer?: Maybe<
    { __typename?: 'User' } & Pick<User, 'id' | 'email' | 'photoUrl'>
  >
}

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
export const ViewerDocument = gql`
  query Viewer {
    viewer {
      id
      email
      photoUrl
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
