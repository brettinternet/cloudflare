import { handleRequest } from './handler'
import { testOrigin } from '../shared/url'

describe('handleRequest', () => {
  test('provides details about the request', async () => {
    const response = await handleRequest(
      new Request(`${testOrigin}/request`, {
        method: 'GET',
        headers: {
          'CF-Connecting-IP': '127.0.0.1',
        },
        cf: {
          region: 'Texas',
          asn: 395747,
          asOrganization: 'Cloudflare',
          country: 'US',
          clientTcpRtt: 0,
          colo: 'DFW',
          httpProtocol: 'https',
          requestPriority: 'weight=256;exclusive=1',
          tlsVersion: '',
          tlsCipher: '',
          tlsClientAuth: {
            certIssuerDNLegacy: '',
            certIssuerDN: '',
            certPresented: '0',
            certSubjectDNLegacy: '',
            certSubjectDN: '',
            certNotBefore: '',
            certNotAfter: '',
            certSerial: '',
            certFingerprintSHA1: '',
            certVerified: '',
          },
        },
      })
    )
    expect(response.status).toBe(200)
    const doc = await response.text()
    expect(doc).toContain('127.0.0.1')
    expect(doc).toContain('Texas')
  })
})
