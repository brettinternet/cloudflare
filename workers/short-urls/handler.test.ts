import { handleRequest, statusCode, urls, rootRedirectUrl } from './handler'

const testOrigin = 'http://localhost'

describe('handle', () => {
  test('valid short URLs are redirected', async () => {
    const result = await handleRequest(
      new Request(`${testOrigin}/twitter`, { method: 'GET' })
    )
    expect(result.status).toBe(statusCode)
    expect(result.headers.get('location')).toBe(urls.twitter)
  })

  test('invalid short URLs are not found and not redirected', async () => {
    const result = await handleRequest(
      new Request(`${testOrigin}/asdf`, { method: 'GET' })
    )
    expect(result.status).toBe(404)
    expect(result.headers.get('location')).toBe(null)
  })

  test('root URL redirects to home page', async () => {
    const result = await handleRequest(
      new Request(`${testOrigin}`, { method: 'GET' })
    )
    expect(result.status).toBe(statusCode)
    expect(result.headers.get('location')).toBe(rootRedirectUrl + '/')
  })
})
