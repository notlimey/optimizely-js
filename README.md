# Optimizely JS

A monorepo for Optimizely CMS JavaScript/TypeScript packages, tools, and extensions.

This repository uses [Turborepo](https://turbo.build/) and [pnpm](https://pnpm.io/) workspaces to manage packages and example applications.

## Packages

### [`@notlimey/optimizely-nextjs-multisite`](./packages/nextjs-multisite/README.md)
A Next.js package designed to seamlessly integrate Optimizely CMS Multisite routing and context into your Next.js App Router applications.

- **Location:** `packages/nextjs-multisite`
- **Features:** Next.js Middleware integration, secure signature context forwarding, edge-compatible.

## Apps

### [`web`](./apps/web/README.md) (Example Project)
An example Next.js App Router application demonstrating how to consume the `@notlimey/optimizely-nextjs-multisite` package.

- **Location:** `apps/web`
- **Usage:** Shows how to implement the `createSiteConfiguration`, hook up Next.js Middleware, and retrieve multisite context within Server Components.

## Development

### Setup

Ensure you have [pnpm](https://pnpm.io/installation) installed, then run:

```bash
pnpm install
```

### Useful Commands

From the root directory, you can use Turborepo to run commands across all workspaces:

- `pnpm dev` - Starts the development server for the example app and watches for package changes.
- `pnpm build` - Builds all packages and apps.
- `pnpm lint` - Runs linting across all packages and apps.
- `pnpm format` - Runs Prettier to format all `.ts`, `.tsx`, and `.md` files.
- `pnpm check-types` - Runs TypeScript type checking across the repo.

### Example Environment

To run the `web` example locally, make sure to set up your `.env.local` inside `apps/web` with the necessary Optimizely Graph keys and your `OPTIMIZELY_MULTISITE_HEADER_SECRET` matching your multisite configuration.

## License
ISC