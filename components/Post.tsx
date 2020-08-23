import React from 'react'

export type User = {
  name: string
  imageUrl: string
}

export type Comment = {
  author: User
  comment: string
}

export type PostProps = {
  id: number
  author: User
  comments: Comment[]
}

export const Post: React.FC<PostProps> = ({ id, author, comments }) => {
  return (
    <div className="w-full border bg-white rounded-sm">
      <div className="flex p-4 items-center">
        <img className="rounded-full" src={author.imageUrl} />
        <h2 className="pl-4">{author.name}</h2>
      </div>
      <img className="w-full" src={`https://picsum.photos/seed/${id}a/600`} />
      <div>like, comment icon // TODO</div>
      <div>likes: // TODO</div>
      <div>
        comments element // TODO
        {comments.map((comment) => (
          <div key={comment.comment}>{comment.comment}</div>
        ))}
      </div>
      <div>timestamp // TODO</div>
      <hr />
      <div>add comment // TODO</div>
    </div>
  )
}
