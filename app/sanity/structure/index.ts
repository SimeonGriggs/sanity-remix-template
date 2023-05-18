import {Disc, Home, Tags, Users} from 'lucide-react'
import type {SanityDocument} from 'sanity'
import type {DefaultDocumentNodeResolver, StructureResolver} from 'sanity/desk'
import Iframe from 'sanity-plugin-iframe-pane'

import OGPreview from '~/sanity/components/OGPreview'
import {projectDetails} from '~/sanity/projectDetails'
import type {SanityDocumentWithSlug} from '~/sanity/structure/resolvePreviewUrl'
import {resolvePreviewUrl} from '~/sanity/structure/resolvePreviewUrl'

import {resolveOGUrl} from './resolveOGUrl'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      // Singleton, home page curation
      S.documentListItem()
        .schemaType('home')
        .icon(Home)
        .id('home')
        .title('Home'),
      S.divider(),
      // Document lists
      S.documentTypeListItem('record').title('Records').icon(Disc),
      S.documentTypeListItem('artist').title('Artists').icon(Users),
      S.divider(),
      S.documentTypeListItem('genre').title('Genres').icon(Tags),
    ])

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  {schemaType, getClient}
) => {
  const {apiVersion} = projectDetails()
  const client = getClient({apiVersion})

  const previewView = S.view
    .component(Iframe)
    .options({
      url: (doc: SanityDocumentWithSlug) => resolvePreviewUrl(doc, client),
      reload: {button: true},
    })
    .title('Preview')
  const OGPreviewView = S.view
    .component(OGPreview)
    .options({
      url: (doc: SanityDocument) => resolveOGUrl(doc),
    })
    .title('OG Preview')

  switch (schemaType) {
    case `home`:
      return S.document().views([S.view.form(), previewView])
    case `record`:
      return S.document().views([S.view.form(), previewView, OGPreviewView])
    default:
      return S.document().views([S.view.form()])
  }
}
