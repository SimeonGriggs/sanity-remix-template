import {useEffect, useState} from 'react'

export function ExitPreview() {
  const [inIframe, setInIframe] = useState(true)
  useEffect(() => {
    setInIframe(window.self !== window.top)
  }, [])

  return inIframe ? null : (
    <div className="pointer-events-none fixed inset-0 flex h-screen w-screen items-end justify-end p-2">
      <form
        className="pointer-events-auto"
        action="/resource/preview"
        method="POST"
      >
        <button
          className="bg-black p-4 leading-none font-bold text-white"
          type="submit"
        >
          Exit Preview Mode
        </button>
      </form>
    </div>
  )
}
