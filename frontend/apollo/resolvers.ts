import { AuthenticationError, UserInputError } from 'apollo-server-micro'
import {
  createUser,
  findUser,
  findUserByName,
  validatePassword,
} from '../lib/user'
import { getLoginSession, setLoginSession } from '../lib/auth'
import { removeTokenCookie } from '../lib/auth-cookies'
import { followUser, unfollowUser } from '../lib/followers'

export const resolvers = {
  Query: {
    async viewer(_parent, _args, context, _info) {
      try {
        const session = await getLoginSession(context.req)

        if (session) {
          return findUser({ email: session.email })
        }
      } catch (error) {
        throw new AuthenticationError(
          'Authentication token is invalid, please log in'
        )
      }
    },
    async user(_parent, { displayName }, _context, _info) {
      try {
        return findUserByName({ displayName })
      } catch (e) {
        return null
      }
    },
  },
  Mutation: {
    async signUp(_parent, args, _context, _info) {
      const user = await createUser(args.input)
      return { user }
    },
    async signIn(_parent, args, context, _info) {
      const user = await findUser({ email: args.input.email })

      if (user && (await validatePassword(user, args.input.password))) {
        const session = {
          id: user.id,
          email: user.email,
        }

        await setLoginSession(context.res, session)

        return { user }
      }

      throw new UserInputError('Invalid email and password combination')
    },
    async signOut(_parent, _args, context, _info) {
      removeTokenCookie(context.res)
      return true
    },
    /*
    follow(userId: ID!, follow: ID!): UserInfo
    unfollow(userId: ID!, follow: ID!): UserInfo
    */
    async follow(_parent, { userId, follow }, _context, _info) {
      const { displayName } = (await followUser({ userId, follow })) ?? {}
      return findUserByName({ displayName })
    },

    async unfollow(_parent, { userId, follow }, _context, _info) {
      const { displayName } = (await unfollowUser({ userId, follow })) ?? {}
      return findUserByName({ displayName })
    },
  },
}
