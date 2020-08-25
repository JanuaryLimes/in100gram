import faker from 'faker'
import { UserModel, PostProps, Comment } from '../types'

function getFakeUser(): UserModel {
  return {
    name: faker.internet.userName(), // faker.name.firstName() + faker.name.lastName(),
    imageUrl: `https://picsum.photos/seed/${faker.random.number(200)}/32`,
  }
}

export const posts: PostProps[] = (() => {
  const result = [0, 3, 2, 4].map((num) => {
    const commentCount = faker.random.number({ min: 0, max: 12 })
    const comments: Comment[] = []
    for (let i = 0; i < commentCount; i++) {
      comments.push({ author: getFakeUser(), comment: faker.lorem.sentence() })
    }

    return { id: num, author: getFakeUser(), comments }
  })

  // eslint-disable-next-line no-console
  // console.warn('data', result)

  return result
})()
