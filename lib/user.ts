import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import { knex } from '../knex'

export async function createUser({ email, password, displayName }) {
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')
  const user = {
    id: uuidv4(),
    createdAt: new Date(),
    email,
    hash,
    salt,
    displayName,
  }

  try {
    await knex.insert(user).into('users').then()
  } catch (e) {
    // TODO logger
    throw 'Unable to register'
  }

  return user
}

// Here you should lookup for the user in your DB
export async function findUser({ email }) {
  const user = await knex.select('*').from('users').where({ email }).then()
  return user?.[0]
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export async function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = user.hash === inputHash
  return passwordsMatch
}
