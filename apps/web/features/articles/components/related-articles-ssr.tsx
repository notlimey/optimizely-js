import { siteConfiguration } from "~/core/siteConfiguration";
import { getRelatedArticles } from "../data/relatedArticles";
import { RelatedArticles } from "./related-articles";

export const RelatedArticlesSSR = async () => {
	const { siteId, language } = await siteConfiguration.details();
	const relatedArticles = await getRelatedArticles({
		language,
		limit: 9,
		siteId,
	});

	return <RelatedArticles relatedArticles={relatedArticles} />;
};
