// Based on how Remix recommends handling environment variables
// https://remix.run/docs/en/main/guides/envvars

// None of these are secrets, but all of them are required
// Throughout the app server and client side
declare global {
  interface Window {
    ENV: {
      SANITY_PROJECT_ID: string
      SANITY_DATASET: string
      SANITY_API_VERSION: string
      SANITY_FRONTEND_URL: string
      SANITY_URL: string
    }
  }
}

const {SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_VERSION} =
  typeof document === 'undefined' ? process.env : window.ENV

export const projectId = SANITY_PROJECT_ID!
export const dataset = SANITY_DATASET!
export const apiVersion = SANITY_API_VERSION ?? `2024-02-13`

export const projectDetails = () => ({
  projectId,
  dataset,
  apiVersion,
})

// Enable stega on production deploys, but NOT the non-production domain
// Allow the production Studio to access non-production domains cross-origin

// Vercel provides multiple URLs for a single deployment:
// www.your-production-domain.com
// <git-repo-slug>-git-<branch>-<username>.vercel.app
// <git-repo-slug>-<sha>-<username>.vercel.app

// This is used to enable stega on any URL except this one
export const PRODUCTION_URL = 'https://sanity-remix-template.sanity.build'

// This is the front end URL that should display inside Presentation
export const getFrontendUrl =
  typeof document === 'undefined'
    ? process.env.VERCEL
      ? `https://${process.env.VERCEL_BRANCH_URL}`
      : process.env.SANITY_FRONTEND_URL!
    : window.ENV.SANITY_FRONTEND_URL!

export const frontendUrl = getFrontendUrl ?? 'http://localhost:3000'

// This is the Studio URL that will be allowed to access the front end URL
export const getStudioUrl =
  typeof document === 'undefined'
    ? process.env.VERCEL
      ? process.env.VERCEL_ENV !== 'production'
        ? `https://${process.env.VERCEL_URL}`
        : PRODUCTION_URL
      : process.env.SANITY_URL!
    : window.ENV.SANITY_URL!

export const studioUrl = getStudioUrl ?? 'http://localhost:3000'

// With the logic below we enable stega only on the non-production domain
export function isStegaEnabled(url: string) {
  const {hostname} = new URL(url)
  return hostname !== new URL(PRODUCTION_URL).hostname
}

// If any of these values are missing, throw errors as the app requires them
if (!projectId) throw new Error('Missing SANITY_PROJECT_ID in .env')
if (!dataset) throw new Error('Missing SANITY_DATASET in .env')
if (!apiVersion) throw new Error('Missing SANITY_API_VERSION in .env')
if (!frontendUrl) throw new Error('Missing SANITY_FRONTEND_URL in .env')
if (!studioUrl) throw new Error('Missing SANITY_URL in .env')
