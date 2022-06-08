export const statusCode = 301
export const rootRedirectUrl = 'https://brettinternet.com'

/**
 * Use pathname on short url as key
 * for value point to URL for redirection
 */
export const urls = {
  twitter: 'https://twitter.com/brettinternet',
  bookmarks: 'https://bookmarks.brettgardiner.net/u:brett',
} as const

const isDefinedPath = (pathname: string): pathname is keyof typeof urls =>
  pathname in urls

const getRedirectUrl = (pathname: string): string | undefined => {
  if (isDefinedPath(pathname)) {
    return urls[pathname]
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
    const redirectUrl = getRedirectUrl(identifier)
    if (redirectUrl) {
      return Response.redirect(redirectUrl, statusCode)
    }

    return new Response('Not found', {
      headers: { 'content-type': 'text/plain' },
      status: 404,
    })
  }

  return Response.redirect(rootRedirectUrl, statusCode)
}
