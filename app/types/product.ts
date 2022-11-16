import {z} from 'zod'

// This is a Zod schema
// https://zod.dev/

// It will validate data at run time
// And generate Types during development
// Giving you both the flexibility of writing GROQ queries
// And the safety of Typescript
// without being limited to the shape of your Sanity Schema
export const productZ = z.object({
  title: z.string(),
  slug: z.string(),
  images: z.array(z.any()),
  content: z.array(z.any()),
})

export type Product = z.infer<typeof productZ>

export const productsZ = z.array(productZ)
