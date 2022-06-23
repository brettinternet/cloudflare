import { notFoundResponse } from '../shared/response'
import { isValidHttpUrl } from '../shared/url'

export const statusCode = 302
export const fallbackRootRedirectUrl = 'https://brettinternet.com'

/**
 * A manual short URL handler
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

    return notFoundResponse()
  }

  const rootRedirectUrl =
    (await REDIRECTS.get('root')) || fallbackRootRedirectUrl
  return Response.redirect(rootRedirectUrl, statusCode)
}
