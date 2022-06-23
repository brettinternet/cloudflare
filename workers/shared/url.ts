/**
 * Determines if URL input is valid
 * @source https://stackoverflow.com/a/43467144
 */
export const isValidHttpUrl = (value: string) => {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch (_err) {
    return false
  }
}

/**
 * appends a trailing slash to the URL
 */
export const appendTrailingSlash = (url: string) => url + '/'

/**
 * The origin to use in tests
 */
export const testOrigin = 'http://localhost'
