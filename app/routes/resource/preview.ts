import type {ActionFunction, LoaderArgs, LoaderFunction} from '@remix-run/node'
import {json, redirect} from '@remix-run/node' // or cloudflare/deno
import {useLoaderData} from '@remix-run/react'
import groq from 'groq'
import {client} from '~/sanity/client'

import {getSession, commitSession, destroySession} from '~/sessions'

// A `POST` request to this route will exit preview mode
export const action: ActionFunction = async ({request}) => {
  if (request.method !== 'POST') {
    return json({message: 'Method not allowed'}, 405)
  }

  const session = await getSession(request.headers.get('Cookie'))

  redirect('/', {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  })
}

// A `GET` request to this route will enter preview mode
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

  // Check the secret is valid
  const validSecret = secret === process.env.SANITY_PREVIEW_SECRET

  if (!validSecret) {
    return new Response('Invalid secret', {status: 401})
  }

  // Confirm the passed-in slug actually exists
  const validSlug = await client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0].slug.current`,
    {slug}
  )

  if (!validSlug) {
    return new Response('Invalid slug', {status: 401})
  }

  // Write secret token to session so that every route can authenticate by it
  const session = await getSession(request.headers.get('Cookie'))
  session.set('secret', process.env.SANITY_PREVIEW_SECRET)

  return redirect(`/${validSlug}`, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}
