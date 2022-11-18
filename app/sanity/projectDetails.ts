declare global {
  interface Window {
    ENV: {
      SANITY_PUBLIC_PROJECT_ID: string
      SANITY_PUBLIC_DATASET: string
      SANITY_PUBLIC_API_VERSION: string
    }
  }
}

type ProjectDetails = {
  projectId: string
  dataset: string
  apiVersion: string
}

export const projectDetails = (): ProjectDetails => {
  const {SANITY_PUBLIC_PROJECT_ID, SANITY_PUBLIC_DATASET, SANITY_PUBLIC_API_VERSION} =
    typeof document === 'undefined' ? process.env : window.ENV

  return {
    projectId: String(SANITY_PUBLIC_PROJECT_ID),
    dataset: String(SANITY_PUBLIC_DATASET),
    apiVersion: String(SANITY_PUBLIC_API_VERSION),
  }
}
