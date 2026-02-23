import { sdk } from "~/core/graphql/sdk";

export const getBlock = async (contentGuid: string) => {
	const res = await sdk.ContentById({ ids: [contentGuid] });
	const block = res.Content?.items?.at(0);
	return block ?? null;
};

export type GetBlockResult = Awaited<ReturnType<typeof getBlock>>;

export type BlockByTypename = NonNullable<GetBlockResult>["__typename"];

export type BlockByTypenameWithType<T extends BlockByTypename> = Extract<
	GetBlockResult,
	{ __typename: T }
>;
