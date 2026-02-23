# Multisite configuration - Next.js + Optimizely


## Requirements
- Node.js runtime (Edge runtime is NOT supported)
- Next.js 16+


## Get started

The graphql example used in sdk.getSiteDefinitions can be found here [getSiteDefinitions.graphql](./examples/graphql/getSiteDefinitions.graphql)
```ts
// Create multisite instance on server 
export const siteConfiguration = createSiteConfiguration({
    security: {
        headerSignatureSecret: process.env.OPTIMIZELY_MULTISITE_HEADER_SECRET || "",
    },
    get: async () => {
        const res = await sdk.SiteStructure()
        return (res.SiteDefinition?.items || []) as SiteDefinitionDTO[]
    }
})
```

How to use in a page, layout or any server component
```tsx
// app/[[...slugs]]/page.tsx
const { siteId, relativePath } = await multisite.details();
const page = await sdk.getContentByPath({ siteId, relativePath });
```


```ts
// Example usage

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