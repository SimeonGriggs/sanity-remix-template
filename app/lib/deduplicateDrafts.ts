import type {SanityDocumentLike} from 'sanity'

export function deduplicateDrafts(documents: SanityDocumentLike[]) {
  return documents.reduce<SanityDocumentLike[]>(
    (accumulator, currentObject) => {
      const id = currentObject._id

      if (id.startsWith('drafts.')) {
        const existingObject = accumulator.find(
          (obj) => obj._id === id.substring(7)
        )
        if (!existingObject) {
          accumulator.push(currentObject) // Include the draft object if no non-draft object exists
        }
      } else {
        const existingObject = accumulator.find(
          (obj) => obj._id === `drafts.${id}`
        )
        if (!existingObject) {
          accumulator.push(currentObject) // Include the non-draft object if no draft object exists
        }
      }

      return accumulator
    },
    []
  )
}
