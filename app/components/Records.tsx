import {Link} from '@remix-run/react'
import React from 'react'

import {RecordCover} from '~/components/RecordCover'
import type {RecordStub} from '~/types/record'

type RecordsProps = {
  records: RecordStub[]
}

export function Records(props: RecordsProps) {
  const {records = []} = props

  return records.length > 0 ? (
    <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-12 lg:grid-cols-4">
      {records.map((record) => (
        <li key={record._id} className="group relative flex flex-col">
          <div className="relative overflow-hidden transition-all duration-200 ease-in-out group-hover:scale-105 group-hover:opacity-90">
            <div className="absolute z-0 h-48 w-[200%] translate-x-20 translate-y-20 -rotate-45 bg-gradient-to-b from-white to-transparent opacity-25 mix-blend-overlay transition-transform duration-500 ease-in-out group-hover:translate-x-10 group-hover:translate-y-10 group-hover:opacity-75" />
            <RecordCover image={record.image} title={record.title} />
          </div>
          <div className="flex flex-col">
            {record?.slug ? (
              <Link
                prefetch="intent"
                to={record?.slug}
                className="text-bold pt-4 text-xl font-bold tracking-tighter transition-colors duration-100 ease-in-out hover:bg-cyan-400 hover:text-white md:text-3xl"
              >
                {record.title}
                {/* Makes this entire block clickable */}
                <span className="absolute inset-0" />
              </Link>
            ) : (
              <span className="pt-4 text-xl font-bold tracking-tighter">
                {record.title}
              </span>
            )}
            {record?.artist ? (
              <span className="bg-black font-bold leading-none tracking-tighter text-white">
                {record.artist}
              </span>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <div className="prose prose-xl mx-auto bg-green-50 p-4">
      <p>No records found, yet!</p>
      <p>
        <a href="/studio">Log in to your Sanity Studio</a> and start creating
        content!
      </p>
    </div>
  )
}
