export const statusCode = 302
export const fallbackRootRedirectUrl = 'https://brettinternet.com'

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
 * A manual short URL handler
 * @usage redirects to a URL based on the request URL's pathname
 */
export const handleRequest = async (request: Request): Promise<Response> => {
  const url = new URL(request.url)
  const { pathname } = url
  const identifier = pathname.replace(/^\//, '')

  if (identifier) {
    const redirectUrl = await REDIRECTS.get(identifier)
    if (redirectUrl && isValidHttpUrl(redirectUrl)) {
      return Response.redirect(redirectUrl, statusCode)
    }

    return new Response('Not found', {
      headers: { 'content-type': 'text/plain' },
      status: 404,
    })
  }

  const rootRedirectUrl =
    (await REDIRECTS.get('root')) || fallbackRootRedirectUrl
  return Response.redirect(rootRedirectUrl, statusCode)
}
