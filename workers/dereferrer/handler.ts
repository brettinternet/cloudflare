/**
 * @source https://stackoverflow.com/a/43467144
 */
const isValidHttpUrl = (value: string) => {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch (_err) {
    return false
  }
}

/**
 * A URL dereferrer
 * @usage redirects to a URL based on the request URL's pathname
 */
export const handleRequest = async (request: Request): Promise<Response> => {
  const url = new URL(request.url)
  const redirectUrl = Array.from(url.searchParams.keys())[0]

  if (redirectUrl && isValidHttpUrl(redirectUrl)) {
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

  return new Response('Not found', {
    headers: { 'content-type': 'text/plain' },
    status: 404,
  })
}
