// Based on how Remix recommends handling environment variables
// https://remix.run/docs/en/main/guides/envvars

// None of these are secrets, but all of them are required
// Throughout the app server and client side
declare global {
  interface Window {
    ENV: {
      VITE_SANITY_PROJECT_ID: string
      VITE_SANITY_DATASET: string
      VITE_SANITY_API_VERSION: string
      VITE_SANITY_FRONTEND_URL: string
      VITE_SANITY_URL: string
    }
  }
}

const {VITE_SANITY_PROJECT_ID, VITE_SANITY_DATASET, VITE_SANITY_API_VERSION} =
  typeof document === 'undefined' ? process.env : window.ENV

export const projectId = VITE_SANITY_PROJECT_ID!
export const dataset = VITE_SANITY_DATASET!
export const apiVersion = VITE_SANITY_API_VERSION ?? `2024-02-13`

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
      : import.meta.env.VITE_SANITY_FRONTEND_URL!
    : window.ENV.VITE_SANITY_FRONTEND_URL!

export const frontendUrl = getFrontendUrl ?? 'http://localhost:3000'

// This is the Studio URL that will be allowed to access the front end URL
export const getStudioUrl =
  typeof document === 'undefined'
    ? process.env.VERCEL
      ? process.env.VERCEL_ENV !== 'production'
        ? `https://${process.env.VERCEL_URL}`
        : PRODUCTION_URL
      : import.meta.env.VITE_SANITY_URL!
    : window.ENV.VITE_SANITY_URL!

export const studioUrl = getStudioUrl ?? 'http://localhost:3000'

// If any of these values are missing, throw errors as the app requires them
if (!projectId) throw new Error('Missing VITE_SANITY_PROJECT_ID in .env')
if (!dataset) throw new Error('Missing VITE_SANITY_DATASET in .env')
if (!apiVersion) throw new Error('Missing VITE_SANITY_API_VERSION in .env')
if (!frontendUrl) throw new Error('Missing VITE_SANITY_FRONTEND_URL in .env')
if (!studioUrl) throw new Error('Missing VITE_SANITY_URL in .env')
