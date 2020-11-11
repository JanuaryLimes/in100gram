import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../../apollo/schema'

// const typeDefs = gql`
//   type Query {
//     users: [User!]!
//   }
//   type User {
//     name: String
//   }

//   type Mutation {
//     createPost(title: String!, description: String!): String
//   }
// `

// const resolvers = {
//   Query: {
//     users(_parent, _args, _context) {
//       return [{ name: 'Next.js' }]
//     },
//   },
//   Mutation: {
//     createPost: async (_, { title, description }, _context) => {
//       await knex.insert({ title, description }).into('post').then()
//       return `post inserted: ${title} ${description}`
//     },
//   },
// }

//const apolloServer = new ApolloServer({ typeDefs, resolvers })

const apolloServer = new ApolloServer({
  schema,
  context(ctx) {
    return ctx
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
