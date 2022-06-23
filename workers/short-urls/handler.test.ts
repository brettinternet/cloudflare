import { handleRequest, statusCode, fallbackRootRedirectUrl } from './handler'

const testOrigin = 'http://localhost'
const trailingSlash = (url: string) => url + '/'

describe('handle', () => {
  beforeAll(async () => {
    await REDIRECTS.put('twitter', 'https://twitter.com')
    await REDIRECTS.put('invalid', 'asdf')
  })

  test('valid short URLs are redirected', async () => {
    const response = await handleRequest(
      new Request(`${testOrigin}/twitter`, { method: 'GET' })
    )
    expect(response.status).toBe(statusCode)
    expect(response.headers.get('location')).toBe(
      trailingSlash('https://twitter.com')
    )
  })

  test('missing short URLs are not found and not redirected', async () => {
    const response = await handleRequest(
      new Request(`${testOrigin}/missing`, { method: 'GET' })
    )
    expect(response.status).toBe(404)
    expect(response.headers.get('location')).toBe(null)
  })

  test('invalid short URLs are not found and not redirected', async () => {
    const response = await handleRequest(
      new Request(`${testOrigin}/invalid`, { method: 'GET' })
    )
    expect(response.status).toBe(404)
    expect(response.headers.get('location')).toBe(null)
  })

  test('root URL redirects to fallback URL', async () => {
    const response = await handleRequest(
      new Request(`${testOrigin}`, { method: 'GET' })
    )
    expect(response.status).toBe(statusCode)
    expect(response.headers.get('location')).toBe(
      trailingSlash(fallbackRootRedirectUrl)
    )
  })

  test("root URL redirects to a defined 'root' URL", async () => {
    const rootUrl = 'https://cloudflare.com'
    await REDIRECTS.put('root', rootUrl)

    const response = await handleRequest(
      new Request(`${testOrigin}`, { method: 'GET' })
    )
    expect(response.status).toBe(statusCode)
    expect(response.headers.get('location')).toBe(trailingSlash(rootUrl))
  })
})
