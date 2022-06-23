import { handleRequest } from './handler'
import { statusCode as redirectStatusCode } from '../short-urls/handler'
import { appendTrailingSlash, testOrigin } from '../shared/url'
import { getMetaRefreshUrl } from '../dereferrer/handler.test'

const dereferredUrl = 'https://example.com'
const proxiedURl = dereferredUrl

describe('handleRequest', () => {
  beforeAll(async () => {
    await REDIRECTS.put('example', 'https://example.com')
    await REDIRECTS.put('invalid', 'asdf')
  })

  test('handles short URL redirects', async () => {
    const response = await handleRequest(
      new Request(`${testOrigin}/example`, { method: 'GET' })
    )
    expect(response.status).toBe(redirectStatusCode)
    expect(response.headers.get('location')).toBe(
      appendTrailingSlash('https://example.com')
    )
  })

  test('uses a single search URL key to derefer redirect', async () => {
    const response = await handleRequest(
      new Request(`${testOrigin}?${dereferredUrl}`, { method: 'GET' })
    )
    const doc = await response.text()
    expect(doc).toContain(getMetaRefreshUrl(dereferredUrl))
  })

  test('proxy search param takes precedent over short URLs', async () => {
    const response = await handleRequest(
      new Request(`${testOrigin}/example?proxy=${proxiedURl}`, {
        method: 'GET',
      })
    )
    expect(response.status).toBe(200)
    expect(response.url).toBe(appendTrailingSlash(proxiedURl))
    expect(response.headers.get('location')).not.toBe(
      appendTrailingSlash('https://example.com')
    )
  })

  test('short url takes precedent over dereferrer', async () => {
    const response = await handleRequest(
      new Request(`${testOrigin}/example?${dereferredUrl}`, { method: 'GET' })
    )
    expect(response.status).toBe(redirectStatusCode)
    expect(response.headers.get('location')).toBe(
      appendTrailingSlash('https://example.com')
    )
    const doc = await response.text()
    expect(doc).not.toContain(getMetaRefreshUrl(dereferredUrl))
  })

  test('an unknown pathname is ignored and dereferrer is still possible', async () => {
    const response = await handleRequest(
      new Request(`${testOrigin}/missing?${dereferredUrl}`, {
        method: 'GET',
      })
    )
    const doc = await response.text()
    expect(doc).toContain(getMetaRefreshUrl(dereferredUrl))
  })
})
