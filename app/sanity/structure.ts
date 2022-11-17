import type {DefaultDocumentNodeResolver, StructureResolver} from 'sanity/desk'
import Iframe from 'sanity-plugin-iframe-pane'
import {Disc, Users, Tags} from 'lucide-react'
import type {SanityDocument} from 'sanity'

// import type {PreviewDocument} from './resolveProductionUrl'
// import resolveProductionUrl from './resolveProductionUrl'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      // Singleton, home page curation
      //   S.documentListItem().schemaType('home').icon(Home).id('home').title('Home'),
      // Document lists
      S.documentTypeListItem('record').title('Records').icon(Disc),
      S.documentTypeListItem('artist').title('Artists').icon(Users),
      S.divider(),
      S.documentTypeListItem('genre').title('Genres').icon(Tags),
    ])

function resolvePreviewUrl(doc: SanityDocument) {
  if (!doc?.slug?.current) {
    return ``
  }

  return `http://localhost:3000/${doc.slug.current}`
}

// TODO: Tidy up these repeated methods
export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType, getClient}) => {
  switch (schemaType) {
    case `record`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (doc: SanityDocument) => resolvePreviewUrl(doc),
            reload: {
              button: true,
              revision: true,
            },
          })
          .title('Preview'),
      ])

    default:
      return S.document().views([S.view.form()])
  }
}
