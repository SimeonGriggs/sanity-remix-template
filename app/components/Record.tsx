import React from 'react'
import {definePreview} from '@sanity/preview-kit'

import SanityContent from '~/components/SanityContent'
import {projectDetails} from '~/sanity/projectDetails'
import type {RecordDocument} from '~/types/record'
import Layout from '~/components/Layout'
import Title from '~/components/Title'
import AlbumCover from '~/components/RecordCover'

function secondsToMinutes(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
}

export default function Record(props: RecordDocument) {
  const {title, artist, content, image, tracks} = props

  return (
    <Layout>
      <article className="flex flex-col items-start gap-4 lg:flex-row lg:gap-12">
        <AlbumCover image={image} title={title} />
        <div className="flex flex-shrink-0 flex-col gap-4 lg:w-2/3">
          {title ? <Title>{title}</Title> : null}
          {artist ? (
            <h2 className="bg-black text-2xl font-bold tracking-tighter text-white">{artist}</h2>
          ) : null}
          {content && content?.length > 0 ? <SanityContent value={content} /> : null}
          {tracks && tracks?.length > 0 ? (
            <>
              <ul className="grid grid-cols-1 divide-y divide-gray-100">
                <li className="py-3 text-2xl font-bold tracking-tighter">
                  {tracks?.length === 1 ? `1 Track` : `${tracks?.length} Tracks`}
                </li>
                {tracks.map((track) => (
                  <li key={track.title} className="flex items-center justify-between py-3">
                    <span className="text-lg">{track.title}</span>
                    {track.duration ? (
                      <span className="text-sm font-bold">{secondsToMinutes(track.duration)}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </article>
    </Layout>
  )
}

type PreviewRecordProps = {
  query: string
  params: {[key: string]: string}
  token: string | null
}

const {projectId, dataset} = projectDetails()
const usePreview = definePreview({projectId, dataset})

export function PreviewRecord(props: PreviewRecordProps) {
  const {query, params, token} = props

  const data = usePreview(token ?? null, query, params)

  return (
    <>
      <div className="pointer-events-none fixed inset-0 flex h-screen w-screen items-center justify-end bg-red-500">
        <form className="pointer-events-auto" action="/resource/preview" method="POST">
          <button type="submit">Exit Preview Mode</button>
        </form>
      </div>
      <Record {...data} />
    </>
  )
}
