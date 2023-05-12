declare global {
  interface Window {
    ENV: {
      SANITY_PROJECT_ID: string
      SANITY_DATASET: string
      SANITY_API_VERSION: string
    }
  }
}

type ProjectDetails = {
  projectId: string
  dataset: string
  apiVersion: string
}

export const projectDetails = (): ProjectDetails => {
  const {SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_VERSION} =
    typeof document === 'undefined' ? process.env : window.ENV

  return {
    projectId: SANITY_PROJECT_ID ?? `pnkijp0b`,
    dataset: SANITY_DATASET ?? `remix`,
    apiVersion: SANITY_API_VERSION ?? `2022-09-19`,
  }
}
