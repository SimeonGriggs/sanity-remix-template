import {useFetcher, useLocation} from '@remix-run/react'
import {ThumbsDown, ThumbsUp} from 'lucide-react'

type LikeDislikeProps = {
  id: string
  likes: number
  dislikes: number
}

export function LikeDislike(props: LikeDislikeProps) {
  const {id} = props
  const fetcher = useFetcher<{
    likes: number
    dislikes: number
  }>()
  const location = useLocation()

  // Use fresh data returned from the ActionFunction, if a mutation has just finished
  const isDone = fetcher.state === 'idle' && fetcher.data !== null
  const isWorking =
    fetcher.state === 'loading' || fetcher.state === 'submitting'

  const likes =
    isDone && fetcher.data ? Number(fetcher?.data?.likes) : props?.likes
  const optimisticLikes =
    fetcher.formData && fetcher.formData.get('action') === 'LIKE'
      ? likes + 1
      : likes
  const displayLikes = optimisticLikes || likes

  const dislikes =
    isDone && fetcher.data ? Number(fetcher?.data?.dislikes) : props?.dislikes
  const optimisticDislikes =
    fetcher.formData && fetcher.formData.get('action') === 'DISLIKE'
      ? dislikes + 1
      : dislikes
  const displayDislikes = optimisticDislikes || dislikes

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
        disabled={isWorking}
        className="flex items-center gap-2 bg-black p-4 transition-all duration-100 ease-in-out hover:bg-cyan-400 hover:text-black disabled:opacity-50"
        title="Like"
      >
        <span className="text-xs font-bold">{displayLikes}</span>
        <ThumbsUp />
        <span className="sr-only">Like</span>
      </button>
      <button
        name="action"
        type="submit"
        value="DISLIKE"
        disabled={isWorking}
        className="flex items-center gap-2 bg-black p-4 transition-all duration-100 ease-in-out hover:bg-cyan-400 hover:text-black disabled:opacity-50"
        title="Dislike"
      >
        <ThumbsDown />
        <span className="text-xs font-bold">{displayDislikes}</span>
        <span className="sr-only">Dislike</span>
      </button>
    </fetcher.Form>
  )
}
