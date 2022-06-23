import { isValidHttpUrl } from '../shared/url'
import { notFoundResponse } from '../shared/response'

const methodNotAllowed = (request: Request) => {
  return new Response(`Method ${request.method} not allowed.`, {
    status: 405,
    headers: {
      Allow: 'GET',
    },
  })
}

/**
 * A simple URL proxy
 */
export const handleRequest = async (request: Request): Promise<Response> => {
  const url = new URL(request.url)
  const proxyUrl = url.searchParams.get('proxy')
  if (proxyUrl && isValidHttpUrl(proxyUrl)) {
    if (request.method === 'GET') {
      return fetch(
        new Request(proxyUrl, {
          headers: {
            'referrer-policy': 'no-referrer',
          },
        })
      )
    }
    return methodNotAllowed(request)
  }

  return notFoundResponse()
}
