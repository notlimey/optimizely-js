# Multisite configuration - Next.js + Optimizely


## Requirements
- Nodejs runtime
- Next.js 16+


## Get started

The graphql example used in sdk.getSiteDefinitions can be found here [getSiteDefinitions.graphql](./examples/graphql/getSiteDefinitions.graphql)
```ts
// Create multisite instance on server 
const multisite = configureMultisite({
    // f.ex like this. See comment above about graphql file
	get: () => sdk.getSiteDefinitions()
});
```

How to use in a page, layout or any server component
```tsx
// app/[[...slugs]]/page.tsx
const { siteId, relativePath } = await multisite.resolveSiteProps();
const page = await sdk.getContentByPath({ siteId, relativePath });
```

### Setting more headers
```ts
enum MyHeaders = {
    CUSTOM_HEADER_ONE = "CustomHeaderOne",
    CUSTOM_HEADER_TWO = "CustomHeaderTwo"
}

type MyMultisiteHeaders = InitialMultisiteHeaders | MyHeaders.CUSTOM_HEADER_ONE | CUSTOM_HEADER_TWO;

const multisite = configureMultisite<MyMultisiteHeaders>({
    // f.ex like this. See comment above about graphql file
	get: () => sdk.getSiteDefinitions(),
    hooks: {
        afterResolveSiteDefinitions: async (siteDefinitions, headers) => {
            await headers.set(MyHeaders.CUSTOM_HEADER_ONE, "value")
        }
    }
});
```