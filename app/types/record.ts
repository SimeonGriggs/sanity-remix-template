import {z} from 'zod'

// This is a Zod schema
// https://zod.dev/

// It will validate data at run time
// And generate Types during development
// Giving you both the flexibility of writing GROQ queries
// And the safety of Typescript
// without being limited to the shape of your Sanity Schema
export const recordZ = z.object({
  _id: z.string(),
  title: z.string().nullable(),
  slug: z.string().nullable(),
  artist: z.string().nullable(),
  image: z.any().nullable(),
  content: z.array(z.any()).nullable(),
  tracks: z
    .array(
      z.object({
        title: z.string().nullable(),
        duration: z.number().nullable(),
      })
    )
    .nullable(),
})

export type RecordDocument = z.infer<typeof recordZ>

export const recordsZ = z.array(recordZ)
