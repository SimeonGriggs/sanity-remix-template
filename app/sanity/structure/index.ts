import type {DefaultDocumentNodeResolver, StructureResolver} from 'sanity/desk'
import Iframe from 'sanity-plugin-iframe-pane'
import {Disc, Users, Tags} from 'lucide-react'
import type {SanityClient, SanityDocument, Slug} from 'sanity'
import {projectDetails} from '../projectDetails'
import {getSecret, SECRET_ID} from './getSecret'

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

async function resolvePreviewUrl(doc: SanityDocument & {slug: Slug}, client: SanityClient) {
  const remoteUrl = `https://www.example.com`
  const baseUrl = window?.location?.hostname === 'localhost' ? window.origin : remoteUrl
  const previewUrl = new URL('/resource/preview', baseUrl)

  if (!doc?.slug?.current) {
    return previewUrl.toString()
  }

  previewUrl.searchParams.set('slug', doc.slug.current)
  const secret = await getSecret(client, SECRET_ID, true)

  if (secret) {
    previewUrl.searchParams.set('secret', secret)
  }

  previewUrl.pathname = `/resource/preview`

  return previewUrl.toString()
}

// TODO: Tidy up these repeated methods
export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType, getClient}) => {
  const {apiVersion} = projectDetails()
  const client = getClient({apiVersion})

  switch (schemaType) {
    case `record`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (doc: SanityDocument) => resolvePreviewUrl(doc, client),
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
