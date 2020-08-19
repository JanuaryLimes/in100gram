import React from 'react'
import { Stack } from './Stack'

export const Main = () => {
  const posts = [1, 2, 3, 4]

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full max-w-4xl p-4">
        <Stack
          components={posts.map((post) => (
            <div key={post}>
              <div className="h-64 w-full border bg-white">post {post}</div>
            </div>
          ))}
        />
      </div>
    </div>
  )
}
