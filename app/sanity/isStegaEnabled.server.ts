import {PRODUCTION_URL} from './projectDetails'

// With the logic below we enable stega only on the non-production domain
export function isStegaEnabled(url: string) {
  const {hostname} = new URL(url)
  const stegaShouldBeEnabled = hostname !== new URL(PRODUCTION_URL).hostname

  if (stegaShouldBeEnabled && !process.env.SANITY_READ_TOKEN) {
    console.info(
      'Cannot enable Stega when SANITY_READ_TOKEN is missing in .env',
    )
    return false
  }

  return stegaShouldBeEnabled
}
