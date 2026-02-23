import { sdk } from "~/core/graphql/sdk";

export const getRelatedArticles = async ({
	limit,
	siteId,
	language,
}: {
	limit: number;
	siteId: string;
	language?: string;
}) => {
	const relatedArticles = await sdk.Articles({ language, limit, siteId });
	return relatedArticles.WebPublicationArticlePage?.items;
};

export type RelatedArticles = Awaited<ReturnType<typeof getRelatedArticles>>;
