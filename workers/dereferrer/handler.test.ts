import { handleRequest } from './handler'

const testOrigin = 'http://localhost'
const dereferredUrl = 'https://example.com'

const getMetaRefreshUrl = (url: string) =>
  `<meta http-equiv="refresh" content="0;URL=${url}" />`

describe('handle', () => {
  test('includes a response with a meta-refresh URL redirect', async () => {
    const response = await handleRequest(
      new Request(`${testOrigin}/?${dereferredUrl}`, { method: 'GET' })
    )
    const doc = await response.text()
    expect(doc).toContain(getMetaRefreshUrl(dereferredUrl))
  })

  test('includes meta tag and headers to deter robots and make no-referrer policy', async () => {
    const response = await handleRequest(
      new Request(`${testOrigin}/?${dereferredUrl}`, { method: 'GET' })
    )
    const doc = await response.text()
    expect(doc).toContain('<meta name="referrer" content="no-referrer" />')
    for (const [key, value] of response.headers) {
      switch (key) {
        case 'referrer-policy':
          expect(value).toBe('no-referrer')
          break
        case 'x-robots-tag':
          expect(value).toBe('noindex')
          break
        case 'x-content-type-options':
          expect(value).toBe('nosniff')
          break
      }
    }
  })

  test('responds with a 200 status', async () => {
    const response = await handleRequest(
      new Request(`${testOrigin}/?${dereferredUrl}`, { method: 'GET' })
    )
    expect(response.status).toBe(200)
  })

  test('other search params are ignored in the URL', async () => {
    const response = await handleRequest(
      new Request(
        `${testOrigin}/?${dereferredUrl}&url=https://example.com/bad`,
        { method: 'GET' }
      )
    )
    expect(response.status).toBe(200)
    const doc = await response.text()
    expect(doc).toContain(getMetaRefreshUrl(dereferredUrl))
  })

  test('returns a 404 when an invalid URL is provided', async () => {
    const response = await handleRequest(
      new Request(`${testOrigin}/?invalid`, { method: 'GET' })
    )
    expect(response.status).toBe(404)
  })

  test('returns a 404 when no URL is provided', async () => {
    const response = await handleRequest(
      new Request(`${testOrigin}`, { method: 'GET' })
    )
    expect(response.status).toBe(404)
  })
})
