import React from 'react'
import { Stack } from './Stack'
import { Post } from './Post'
import { MainProps } from '../types'
import { Content } from './Content'

export const Main: React.FC<MainProps> = ({ postsData }) => {
  // eslint-disable-next-line no-console
  console.log('posts data', postsData)

  return (
    <Content>
      <Stack
        components={postsData.map((post) => (
          <div key={post.id}>
            <Post {...post} />
          </div>
        ))}
      />
    </Content>
  )
}
