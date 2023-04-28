import {useFetcher, useLocation} from '@remix-run/react'
import {ThumbsUp, ThumbsDown} from 'lucide-react'
import React from 'react'

type LikeDislikeProps = {
  id: string
  likes: number
  dislikes: number
}

export default function LikeDislike(props: LikeDislikeProps) {
  const {id} = props
  const fetcher = useFetcher()
  const location = useLocation()

  // Use fresh data returned from the ActionFunction, if a mutation has just finished
  let isDone = fetcher.state === 'idle' && fetcher.data != null
  const likes = isDone ? fetcher.data.likes : props.likes
  const dislikes = isDone ? fetcher.data.dislikes : props.dislikes

  return (
    <fetcher.Form
      action={location.pathname}
      className="flex items-center justify-center gap-4 bg-black text-white"
      method="post"
    >
      <input name="id" type="hidden" value={id} />
      <button
        name="action"
        type="submit"
        value="LIKE"
        disabled={fetcher.state !== 'idle'}
        className="flex items-center gap-2 bg-black p-4 transition-all duration-100 ease-in-out hover:bg-cyan-400 hover:text-black disabled:opacity-50"
        title="Like"
      >
        <span className="text-xs font-bold">{likes}</span>
        <ThumbsUp />
        <span className="sr-only">Like</span>
      </button>
      <button
        name="action"
        type="submit"
        value="DISLIKE"
        disabled={fetcher.state !== 'idle'}
        className="flex items-center gap-2 bg-black p-4 transition-all duration-100 ease-in-out hover:bg-cyan-400 hover:text-black disabled:opacity-50"
        title="Dislike"
      >
        <ThumbsDown />
        <span className="text-xs font-bold">{dislikes}</span>
        <span className="sr-only">Dislike</span>
      </button>
    </fetcher.Form>
  )
}
