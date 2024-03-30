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
    }
  }
}

let projectId: string
let dataset: string
let apiVersion: string
const defaultApiVersion = `2024-02-13`

if (typeof document === 'undefined') {
  if (typeof process !== 'undefined') {
    projectId = process.env.VITE_SANITY_PROJECT_ID!
    dataset = process.env.VITE_SANITY_DATASET!
    apiVersion = process.env.VITE_SANITY_API_VERSION ?? defaultApiVersion
  } else {
    projectId = import.meta.env.VITE_SANITY_PROJECT_ID
    dataset = import.meta.env.VITE_SANITY_DATASET
    apiVersion = import.meta.env.VITE_SANITY_API_VERSION ?? defaultApiVersion
  }
} else {
  projectId = window.ENV.VITE_SANITY_PROJECT_ID
  dataset = window.ENV.VITE_SANITY_DATASET
  apiVersion = window.ENV.VITE_SANITY_API_VERSION ?? defaultApiVersion
}

export {apiVersion, dataset, projectId}

export const projectDetails = () => ({
  projectId,
  dataset,
  apiVersion,
})

// If any of these values are missing, throw errors as the app requires them
if (!projectId) {
  throw new Error(
    `Missing VITE_SANITY_PROJECT_ID in .env, run npx sanity@latest init --env`,
  )
}
if (!dataset) {
  throw new Error(
    `Missing VITE_SANITY_DATASET in .env, run npx sanity@latest init --env`,
  )
}
if (!apiVersion) {
  throw new Error(
    `Missing VITE_SANITY_API_VERSION in .env, run npx sanity@latest init --env`,
  )
}
