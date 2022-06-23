import { handleRequest } from './handler'
import { testOrigin, appendTrailingSlash } from '../shared/url'

const proxiedURl = 'http://example.com'

describe('handleRequest', () => {
  test('proxies requests to the requested URL', async () => {
    const response = await handleRequest(
      new Request(`${testOrigin}/?proxy=${proxiedURl}`, { method: 'GET' })
    )
    expect(response.status).toBe(200)
    expect(response.url).toBe(appendTrailingSlash(proxiedURl))
  })

  test('returns 404 for invalid URL', async () => {
    const response = await handleRequest(
      new Request(`${testOrigin}/?goto=invalid`, { method: 'GET' })
    )
    expect(response.status).toBe(404)
  })

  test('returns 404 for invalid search param', async () => {
    const response = await handleRequest(
      new Request(`${testOrigin}/?goto=${proxiedURl}`, { method: 'GET' })
    )
    expect(response.status).toBe(404)
  })
})
