import type {ActionFunction, LoaderArgs} from '@remix-run/node'
import {json, redirect} from '@remix-run/node'
import groq from 'groq'

import {previewClient} from '~/sanity/client'
import {getSecret, SECRET_ID} from '~/sanity/structure/getSecret'
import {commitSession, destroySession, getSession} from '~/sessions'

// A `POST` request to this route will exit preview mode
export const action: ActionFunction = async ({request}) => {
  if (request.method !== 'POST') {
    return json({message: 'Method not allowed'}, 405)
  }

  const session = await getSession(request.headers.get('Cookie'))

  return redirect('/', {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  })
}

const PREVIEW_TYPES = [`record`, `home`]

// A `GET` request to this route will enter preview mode
// It will check if the "token" document in the dataset
// Is the same as the one passed in the query string
// If so, it will write the Viewer Token to the session
export const loader = async ({request}: LoaderArgs) => {
  const {token, projectId} = previewClient.config()

  if (!token) {
    return new Response(
      `Setup "SANITY_READ_TOKEN" with a token with "Viewer" permissions to your environment variables. Create one at https://sanity.io/manage/project/${projectId}/api#tokens`,
      {status: 401}
    )
  }

  const requestUrl = new URL(request.url)

  // Check the URL has a valid type
  const type = requestUrl.searchParams.get('type')

  if (!type) {
    return new Response('No document type in preview URL', {status: 401})
  }

  if (!PREVIEW_TYPES.includes(type)) {
    return new Response('Invalid document type for preview', {status: 401})
  }

  // Check the URL has a ?secret param
  const secret = requestUrl.searchParams.get('secret')

  if (!secret) {
    return new Response('No secret in URL', {status: 401})
  }

  // Check the secret is valid
  const validSecret = await getSecret(previewClient, SECRET_ID, false)

  if (validSecret !== secret) {
    return new Response('Invalid secret', {status: 401})
  }

  let validSlug = `/`

  // Records have slugs, home page does not
  if (type === `record`) {
    // Check the URL has a valid ?slug param)
    const slug = requestUrl.searchParams.get('slug')

    if (!slug) {
      return new Response('No slug in preview URL', {status: 401})
    }

    // Confirm the passed-in slug actually exists
    const recordSlug = await previewClient.fetch(
      groq`*[_type == "record" && slug.current == $slug][0].slug.current`,
      {slug}
    )

    if (!recordSlug) {
      return new Response('Invalid slug', {status: 401})
    }

    validSlug = `/${recordSlug}`
  }

  // Write viewer token to session so that every route can authenticate by it
  const session = await getSession(request.headers.get('Cookie'))
  session.set(`token`, token)

  return redirect(validSlug, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}
