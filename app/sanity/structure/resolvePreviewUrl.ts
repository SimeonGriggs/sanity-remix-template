import type {SanityClient, SanityDocument, Slug} from 'sanity'

export type SanityDocumentWithSlug = SanityDocument & {slug: Slug}

export async function resolvePreviewUrl(
  doc: SanityDocumentWithSlug,
  client: SanityClient,
) {
  // Studio is a client-side only app so window should be available
  if (typeof window === 'undefined') {
    return ''
  }

  const previewUrl = new URL('/resource/preview', window.origin)

  if (doc?.slug?.current) {
    previewUrl.searchParams.set('slug', doc.slug.current)
  }

  // const secret = await getSecret(client, SECRET_ID, true)

  // if (secret) {
  // previewUrl.searchParams.set('secret', secret)
  // }

  return previewUrl.toString()
}
