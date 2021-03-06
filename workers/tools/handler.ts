import { handleRequest as handleDereferrerRequest } from '../dereferrer/handler'
import { handleRequest as handleShortRequest } from '../short-urls/handler'
import { handleRequest as handleProxyRequest } from '../proxy/handler'
import { handleRequest as handleDetailsRequest } from '../request-details/handler'

/**
 * Short URL handler, URL dereferrer, URL proxy and request details provider
 */
export const handleRequest = async (request: Request): Promise<Response> => {
  const url = new URL(request.url)
  const { pathname } = url

  // If a specific query param or pathname is included

  const proxyUrl = url.searchParams.get('proxy')
  if (proxyUrl) {
    return handleProxyRequest(request)
  }

  if (pathname === '/ip') {
    // new line at end for curl
    return new Response(
      `${request.headers.get('CF-Connecting-IP') || ''}
`,
      {
        headers: { 'content-type': 'text/plain' },
        status: 200,
      }
    )
  }

  if (pathname === '/request') {
    return handleDetailsRequest(request)
  }

  // If the pathname matches one of the redirect keys then it's a short URL
  const shortRedirectId = pathname.replace(/^\//, '')
  if (shortRedirectId && (await REDIRECTS.get(shortRedirectId))) {
    return handleShortRequest(request)
  }

  // If it does not have a specific query param, but has a query param, then it should be dereferred
  if (Array.from(url.searchParams.keys()).length > 0) {
    return handleDereferrerRequest(request)
  }

  // For possible default redirect to root URL
  return handleShortRequest(request)
}
