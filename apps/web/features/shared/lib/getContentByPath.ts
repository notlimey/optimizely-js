import { cache } from "react";
import { sdk } from "~/core/graphql/sdk";
import { siteConfiguration } from "~/core/siteConfiguration";

async function fetchContentByPath(path: string, siteId: string) {
	const content = await sdk.ContentByPath({
		path: path,
		siteId: siteId,
	});
	return content.Content?.items?.[0] ?? null;
}

export type ContentByPathResult = Awaited<
	ReturnType<typeof fetchContentByPath>
>;

export const getContentByPath = async () => {
	const { relativePath: path, siteId } = await siteConfiguration.details();
	const content = await cache(() => fetchContentByPath(path, siteId))();

	return content;
};
export type ContentByPathTypename = NonNullable<
	NonNullable<ContentByPathResult>["__typename"]
>;

export type ContentByPathWithType<T extends ContentByPathTypename> = Extract<
	ContentByPathResult,
	{ __typename: T }
>;
