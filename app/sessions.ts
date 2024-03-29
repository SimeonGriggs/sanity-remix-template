import {createCookieSessionStorage} from '@remix-run/node'

export const PREVIEW_SESSION_NAME = '__preview'

const {getSession, commitSession, destroySession} = createCookieSessionStorage({
  cookie: {
    name: PREVIEW_SESSION_NAME,
    secrets: [process.env.SANITY_SESSION_SECRET!],
    sameSite: 'lax',
  },
})

export {commitSession, destroySession, getSession}
