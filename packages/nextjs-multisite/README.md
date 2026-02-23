# @notlimey/optimizely-nextjs-multisite

A Next.js package designed to seamlessly integrate Optimizely CMS Multisite routing and context into your Next.js App Router applications.

This package securely resolves the correct site definition based on incoming requests in Next.js Middleware, signs the context, and securely passes it down to your Next.js server components via request headers.

## Features

- **Next.js App Router Native**: Uses `next/server` and `next/headers` out-of-the-box.
- **Middleware Integration**: Intercepts requests, matches the incoming host against your Optimizely site definitions, and securely forwards the context.
- **Secure by Default**: Uses a signature secret to prevent header spoofing from malicious clients.
- **Strongly Typed**: Full TypeScript support for your site configuration and resolved context.

## Requirements
- Node.js runtime (Edge runtime is **NOT** supported as the package relies on Node.js Crypto for signatures)
- Next.js 16+
- App Router (`app` directory)

## Installation

```bash
npm install @notlimey/optimizely-nextjs-multisite
# or
yarn add @notlimey/optimizely-nextjs-multisite
# or
pnpm add @notlimey/optimizely-nextjs-multisite
```

## Setup & Usage

### 1. Create your Configuration

First, create a centralized file to initialize your site configuration. This configures how your app retrieves your `SiteDefinition`s (usually via Optimizely Content Graph GraphQL API) and defines your security signature secret.

> The graphql example used in `sdk.getSiteDefinitions` can be found here: [getSiteDefinitions.graphql](./examples/graphql/getSiteDefinitions.graphql)

```ts
// src/multisite.ts (or wherever you keep your utilities)
import { createSiteConfiguration } from "@notlimey/optimizely-nextjs-multisite";
// Import your generated GraphQL SDK or fetcher here
import sdk from "./your-sdk";

export const siteConfiguration = createSiteConfiguration({
    security: {
        // Essential: Keep this secret in your environment variables!
        headerSignatureSecret: process.env.OPTIMIZELY_MULTISITE_HEADER_SECRET || "",
    },
    // The get method is called internally to fetch definitions
    // I recommend adding caching here if your definitions don't change often.
    get: async () => {
        const res = await sdk.SiteStructure();
        return (res.SiteDefinition?.items || []);
    }
});
```

### 2. Add to Middleware

In your Next.js Middleware, use `handleProxy` to process incoming requests. This will match the request host, determine the proper site and language, and attach securely signed HTTP headers forwarding this context down.

```ts
// src/middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { siteConfiguration } from "./multisite";

export async function middleware(request: NextRequest) {
    try {
        // Automatically maps the request to an Optimizely site and proxies
        // the modified request (with secure headers) to Next.js
        return await siteConfiguration.handleProxy(request);
    } catch (error) {
        console.error("Multisite resolution failed", error);
        // Fallback or error handling
        return NextResponse.next();
    }
}

export const config = {
    // Avoid running middleware on static files and Next.js internals
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
```

### 3. Consume in Server Components

Inside your layouts, pages, or any Server Component, simply call `.details()` to extract the parsed multisite context securely.

```tsx
// app/[[...slugs]]/page.tsx
import { siteConfiguration } from "../../src/multisite";
import sdk from "../../src/your-sdk";

export default async function Page() {
    // details() reads next/headers and validates the secure signature
    const { siteId, relativePath, language, masterLanguage, currentHost } = await siteConfiguration.details();
    
    // Use the context to fetch the correct Optimizely content
    const page = await sdk.getContentByPath({ 
        siteId, 
        relativePath,
        language 
    });

    return (
        <main>
            <h1>{page?.name}</h1>
            {/* Render your page content */}
        </main>
    );
}
```

### Advanced Example: Server Action / Helper

You can also use `.details()` directly in your shared data-fetching utilities:

```ts
// src/helpers/getChildren.ts
import { siteConfiguration } from "../multisite";
import sdk from "../your-sdk";

export const getChildren = async (parentGuid: string) => {
	const { siteId, language } = await siteConfiguration.details();

	const content = await sdk.GetContentByParent({
		parentId: parentGuid,
		siteId,
		language,
	});

	return content?.Content?.items || [];
};
```

## How Hostname Matching Works

When `handleProxy` is called in Middleware, the package resolves the correct site definition by comparing the incoming request's host against the hosts defined in your Optimizely site structure.

The matching process follows a specific priority:
1. **Exact Match:** It looks for a host definition that exactly matches the request host (including port), ignoring case.
2. **Wildcard Port Match:** If no exact match is found, it checks for definitions containing a wildcard port (e.g., `example.com:*`). This matches if the hostnames match, regardless of the port.
3. **Catch-all Match:** A host definition of exactly `*` acts as a catch-all and will match any incoming request.
4. **Fallback:** If multiple matches are found but no exact or wildcard port match takes precedence, it falls back to the first available match.

If no matching host is found, `handleProxy` will throw an error.

## Security considerations

The `headerSignatureSecret` is critical. It ensures that the `x-opti-multisite-*` headers passed down from Middleware haven't been spoofed by an external request. Make sure `process.env.OPTIMIZELY_MULTISITE_HEADER_SECRET` is a long, random string, and is securely stored in your `.env.local` or hosting provider's secrets manager.

## Note
Documentation is partially written with google gemini, can include incorrect information.

## License

ISC
