import type {Block, SanityDocumentLike} from 'sanity'

export type ProductDocument = SanityDocumentLike & {
  title?: string
  slug?: {
    current?: string
  }
  content?: Block[]
}
