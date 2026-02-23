"use server";
import { siteConfiguration } from "~/core/siteConfiguration";
import { getRelatedArticles } from "./relatedArticles";

export const getRelatedArticlesServerAction = async () => {
	const { siteId, language } = await siteConfiguration.details();
	return getRelatedArticles({
		language: language ?? undefined,
		limit: 9,
		siteId,
	});
};
