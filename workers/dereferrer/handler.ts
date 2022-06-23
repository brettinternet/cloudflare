import { notFoundResponse } from '../shared/response'
import { isValidHttpUrl } from '../shared/url'

const dereferrerResponse = (redirectUrl: string) => {
  const html = `<!DOCTYPE html>
<title>Dereferrer</title>
<meta name="referrer" content="no-referrer" />
<meta http-equiv="refresh" content="0;URL=${redirectUrl}" />`
  return new Response(html, {
    headers: {
      'referrer-policy': 'no-referrer',
      'content-type': 'text/html; charset=UTF-8',
      'x-content-type-options': 'nosniff',
      'x-robots-tag': 'noindex',
    },
    status: 200,
  })
}

/**
 * A URL dereferrer
 */
export const handleRequest = async (request: Request): Promise<Response> => {
  const url = new URL(request.url)
  const redirectUrl = Array.from(url.searchParams.keys())[0]
  if (redirectUrl && isValidHttpUrl(redirectUrl)) {
    return dereferrerResponse(redirectUrl)
  }

  return notFoundResponse()
}
