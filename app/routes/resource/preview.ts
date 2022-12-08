import type {ActionFunction, LoaderArgs} from '@remix-run/node'
import {json, redirect} from '@remix-run/node'
import groq from 'groq'
import {previewClient} from '~/sanity/client'
import {getSecret, SECRET_ID} from '~/sanity/structure/getSecret'

import {getSession, commitSession, destroySession} from '~/sessions'

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

// A `GET` request to this route will enter preview mode
// It will check if the "token" document in the dataset
// Is the same as the one passed in the query string
// If so, it will write the Viewer Token to the session
export const loader = async ({request}: LoaderArgs) => {
  const requestUrl = new URL(request.url)

  // Check the URL has a valid ?slug param
  const slug = requestUrl.searchParams.get('slug')

  if (!slug) {
    return new Response('No slug in URL', {status: 401})
  }

  // Check the URL has a ?secret param
  const secret = requestUrl.searchParams.get('secret')

  if (!secret) {
    return new Response('No secret in URL', {status: 401})
  }

  // Confirm the passed-in slug actually exists
  const validSlug = await previewClient.fetch(
    groq`*[_type == "record" && slug.current == $slug][0].slug.current`,
    {slug}
  )

  if (!validSlug) {
    return new Response('Invalid slug', {status: 401})
  }

  const validSecret = await getSecret(previewClient, SECRET_ID, false)

  if (validSecret !== secret) {
    return new Response('Invalid secret', {status: 401})
  }

  // Write viewer token to session so that every route can authenticate by it
  const session = await getSession(request.headers.get('Cookie'))
  session.set(`token`, process.env.SANITY_READ_TOKEN)

  return redirect(`/${validSlug}`, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}
