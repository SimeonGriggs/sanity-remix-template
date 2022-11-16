// https://remix.run/docs/en/v1/api/remix#sessions
import {createCookieSessionStorage} from '@remix-run/node' // or cloudflare/deno

const {getSession, commitSession, destroySession} = createCookieSessionStorage({
  // a Cookie from `createCookie` or the CookieOptions to create one
  cookie: {
    name: '__session',

    // all of these are optional
    domain: 'remix.run',
    // Expires can also be set (although maxAge overrides it when used in combination).
    // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
    //
    // expires: new Date(Date.now() + 60_000),
    httpOnly: true,
    maxAge: 60,
    path: '/',
    sameSite: 'lax',
    secrets: [String(process.env.SANITY_PREVIEW_SECRET)],
    secure: true,
  },
})

export {getSession, commitSession, destroySession}
