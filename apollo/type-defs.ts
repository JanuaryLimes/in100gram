import { gql } from '@apollo/client'
//import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    createdAt: Int!
    photoUrl: String
    displayName: String!
  }
  type UserInfo {
    id: ID!
    email: String!
    createdAt: Int!
    photoUrl: String
    displayName: String!

    postsCount: Int!
    followersCount: Int!
    followingCount: Int!
  }

  input SignUpInput {
    email: String!
    password: String!
    displayName: String!
  }
  input SignInInput {
    email: String!
    password: String!
  }
  type SignUpPayload {
    user: User!
  }
  type SignInPayload {
    user: User!
  }

  type Query {
    user(displayName: String!): UserInfo
    users: [User]!
    viewer: User
  }
  type Mutation {
    signUp(input: SignUpInput!): SignUpPayload!
    signIn(input: SignInInput!): SignInPayload!
    signOut: Boolean!
  }
`
