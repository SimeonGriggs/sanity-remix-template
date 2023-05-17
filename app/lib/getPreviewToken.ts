import {getSession} from '~/sessions'

export async function getPreviewToken(request: Request) {
  const session = await getSession(request.headers.get('Cookie'))
  const token = session.get('token')

  return {
    preview: !!token,
    token: token ? String(token) : null,
  }
}
