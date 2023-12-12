import {z} from 'zod'

export const themePreference = z
  .union([z.literal('dark'), z.literal('light')])
  .optional()

export type ThemePreference = z.infer<typeof themePreference>
