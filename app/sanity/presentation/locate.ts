import groq from 'groq'
import {map} from 'rxjs'
import type {DocumentLocationResolver} from 'sanity/presentation'

// See: https://www.sanity.io/docs/configuring-the-presentation-tool#7dce82cbe90b
export const locate: DocumentLocationResolver = (params, context) => {
  if (params.type === 'record') {
    const doc$ = context.documentStore.listenQuery(
      groq`*[_id == $id][0]{
        "title": coalesce(title, "Untitled"),
        "href": slug.current
      }`,
      params,
      {perspective: 'previewDrafts'},
    )

    // Return a streaming list of locations
    return doc$.pipe(
      map((doc) => {
        if (!doc || !doc.href) {
          return null
        }
        return {
          locations: [
            {title: doc.title, href: doc.href},
            {title: 'Home', href: '/'},
          ],
        }
      }),
    )
  }

  return null
}
