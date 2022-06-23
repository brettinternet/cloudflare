const u = (value: string | number | undefined | null) => value || 'unknown'
const n = (value: string | number | undefined | null) => value || ''

const getText = (request: Request) => {
  const {
    city,
    region,
    postalCode,
    country,
    continent,
    latitude,
    longitude,
    timezone,
    asOrganization,
  } = request.cf || {}
  // https://developers.cloudflare.com/fundamentals/get-started/reference/http-request-headers/#cf-connecting-ip
  const ip = request.headers.get('CF-Connecting-IP')

  if (request.cf) {
    return `IP: ${u(ip)}
AS: ${u(asOrganization)}
Timezone: ${u(timezone)}

Location:
${u(city)}, ${u(region)} ${n(postalCode)}
${u(country)}, ${u(continent)}
${u(latitude)}, ${u(longitude)}`
  } else if (ip) {
    return ip
  }

  return 'No details found'
}

/**
 * Provide details about request from Cloudflare
 */
export const handleRequest = async (request: Request): Promise<Response> =>
  new Response(getText(request), {
    headers: { 'content-type': 'text/plain' },
    status: 200,
  })
