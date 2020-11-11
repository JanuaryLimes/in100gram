// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Knex = require('knex')
const uuidv4 = require('uuid').v4

const hash = `aec0e9c31dc39014f7f2983f4df9d5afdc2223c6a8e80e0a2bcfe91a32077ebe4817148e93b0a3285532c0049bbe10c222fd624a3f929cfd7f79c7e164dbdb0a`
const salt = `50f4141ce4fc23d816eee2100dc183b2`

/**
 *
 * @param {Knex} knex
 */
exports.seed = async function (knex) {
  await knex('users').del().then()
  const users = []
  for (let i = 1; i <= 10; i++) {
    users.push({
      id: uuidv4(),
      createdAt: new Date(),
      email: `test${i}@example.com`,
      hash,
      salt,
      displayName: `test_user_${i}`,
    })
  }
  await knex('users').insert(users).then()

  await knex('followers').del().then()
  const followersIds = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 5],
    [1, 6],
    [1, 7],
    [2, 8],
    [2, 9],
    [2, 0],
    [3, 1],
    [3, 2],
    [3, 4],
    [3, 5],
    [4, 5],
    [4, 6],
    [4, 7],
    [4, 8],
    [5, 6],
    [6, 7],
    [7, 1],
    [7, 2],
    [8, 1],
    [9, 1],
  ]
  await knex('followers')
    .insert(
      followersIds.map((ids) => {
        return {
          userId: users[ids[0]].id,
          follow: users[ids[1]].id,
        }
      })
    )
    .then()
}
