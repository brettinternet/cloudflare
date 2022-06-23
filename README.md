# Cloudflare

[![Deploy workers](https://github.com/brettinternet/cloudflare/actions/workflows/deploy.yml/badge.svg)](https://github.com/brettinternet/cloudflare/actions/workflows/deploy.yml)
[![Test](https://github.com/brettinternet/cloudflare/actions/workflows/test.yml/badge.svg)](https://github.com/brettinternet/cloudflare/actions/workflows/test.yml)

## Workers

- [short-urls](./short-urls): redirects for different places around the web from my own short URLs
- [dereferrer](./dereferrer): redirects URLs while removing the referrer
- [proxy](./proxy): a forward proxy that redirects requests from the Cloudflare worker
- [request-details](./request-details): provide some details about the requesting client

### Setup

Install dependencies.

```sh
npm install
```

### Develop

See start commands associated with workers in [`package.json`](./package.json).

```sh
npm run start:short-urls
```

### Test

Format, lint and test are set up as `npm` scripts.

### Deploy

Deployments run on push to `main`.

### Resources

- [Cloudflare Typescript Worker](https://github.com/cloudflare/worker-typescript-template)
- [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/)

### CI/CD

[Cloudflare wrangler action](https://github.com/cloudflare/wrangler-action) through GitHub actions
