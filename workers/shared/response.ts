export const notFoundResponse = () =>
  new Response('Not found', {
    headers: { 'content-type': 'text/plain' },
    status: 404,
  })
