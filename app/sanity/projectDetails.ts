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
    projectId: SANITY_PUBLIC_PROJECT_ID ?? `pnkijp0b`,
    dataset: SANITY_PUBLIC_DATASET ?? `remix`,
    apiVersion: SANITY_PUBLIC_API_VERSION ?? `2022-09-19`,
  }
}
