import { knex } from '../knex'

export async function followUser({ userId, follow }) {
  await knex('followers').insert({ userId, follow }).then()
  const user = await knex('users').select('*').where({ id: userId }).then()
  return user?.[0]
}

export async function unfollowUser({ userId, follow }) {
  await knex('followers').where({ userId, follow }).del().then()
  const user = await knex('users').select('*').where({ id: userId }).then()
  return user?.[0]
}
