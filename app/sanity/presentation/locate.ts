import groq from 'groq'
import {map} from 'rxjs'
import type {DocumentLocationResolver} from 'sanity/presentation'

// See: https://www.sanity.io/docs/configuring-the-presentation-tool#7dce82cbe90b
export const locate: DocumentLocationResolver = (params, context) => {
  if (params.type === 'record') {
    const doc$ = context.documentStore.listenQuery(
      groq`*[_id == $id][0]{slug,title}`,
      params,
      {perspective: 'previewDrafts'},
    )

    // Return a streaming list of locations
    return doc$.pipe(
      map((doc) => {
        if (!doc || !doc.slug?.current) {
          return null
        }
        return {
          locations: [
            {
              title: doc.title || 'Untitled',
              href: `/${doc.slug.current}`,
            },
            {
              title: 'Home',
              href: '/',
            },
          ],
        }
      }),
    )
  }

  return null
}
