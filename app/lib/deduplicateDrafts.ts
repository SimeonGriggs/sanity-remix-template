import type {SanityDocumentLike} from 'sanity'

export function deduplicateDrafts(data: SanityDocumentLike[]) {
  const draftsMap = new Map()
  const orderArray = []

  // Create the map with draft objects and preserve order
  for (const currentObject of data) {
    const id = currentObject._id
    if (id.startsWith('drafts.')) {
      const draftId = id.substring(7)
      if (!draftsMap.has(draftId) && !draftsMap.has(id)) {
        draftsMap.set(draftId, currentObject)
        orderArray.push(draftId)
      }
    } else {
      if (!draftsMap.has(id)) {
        draftsMap.set(id, currentObject)
        orderArray.push(id)
      }
    }
  }

  // Generate the reduced data array while preserving the original order
  const reducedData = orderArray.map((id) => draftsMap.get(id))

  return reducedData
}
