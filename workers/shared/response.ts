/**
 * new line at end for curl
 */
export const notFoundResponse = () =>
  new Response(
    `Not found
`,
    {
      headers: { 'content-type': 'text/plain' },
      status: 404,
    }
  )
