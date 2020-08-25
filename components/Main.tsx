import React from 'react'
import { Stack } from './Stack'
import { Post } from './Post'
import { MainProps } from '../types'

export const Main: React.FC<MainProps> = ({ postsData }) => {
  // eslint-disable-next-line no-console
  console.log('posts data', postsData)

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full max-w-2xl p-4">
        <Stack
          components={postsData.map((post) => (
            <div key={post.id}>
              <Post {...post} />
            </div>
          ))}
        />
      </div>
    </div>
  )
}
