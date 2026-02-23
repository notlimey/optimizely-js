import type { JSX } from "react";
import ArticlePage from "~/features/articles/views/article-view";
import type { ContentByPathTypename } from "~/features/shared/lib/getContentByPath";
import type { PageProps } from "~/features/shared/types/pageContext";

type PageComponentFunction<K extends ContentByPathTypename> = (
	props: PageProps<K>,
) => JSX.Element | Promise<JSX.Element>;

type PageComponents = {
	[K in ContentByPathTypename]: PageComponentFunction<K>;
};

export const pageComponents: Partial<PageComponents> = {
	WebPublicationArticlePage: ArticlePage,
} as const;
