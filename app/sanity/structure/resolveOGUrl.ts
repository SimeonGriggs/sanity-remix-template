export function resolveOGUrl(documentId?: string) {
  // Studio is a client-side only app so window should be available
  if (!documentId || typeof document === 'undefined') {
    return ''
  }

  const ogUrl = new URL('/resource/og', window.origin)

  ogUrl.searchParams.set('id', documentId)

  return ogUrl.toString()
}
