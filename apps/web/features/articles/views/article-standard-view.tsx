import { Suspense } from "react";
import RichText from "~/features/shared/components/rich-text";
import type { ContentByPathWithType } from "~/features/shared/lib/getContentByPath";
import type { OptimizelyNode } from "~/features/shared/types/richText";
import { ArticleHeaderMetaInfo } from "../components/header/meta-info/meta-info";
import { RelatedArticlesSkeleton } from "../components/related-articles-skeleton";
import { RelatedArticlesSSR } from "../components/related-articles-ssr";

export const ArticleStandardView = ({
	content,
}: {
	content: ContentByPathWithType<"WebPublicationArticlePage">;
}) => (
	<div className="mx-auto max-w-5xl px-5 pb-20">
		<div>
			{"StikkTitle" in content && content.StikkTitle ? (
				<div>{content?.StikkTitle as string}</div>
			) : null}
			<h1>{content.Title}</h1>
			<RichText data={(content?.Preamble as unknown as OptimizelyNode) ?? ""} />
		</div>
		<ArticleHeaderMetaInfo publishedAt={content.StartPublish} />
		<RichText data={content?.MainBody?.Structure ?? ""} />

		<Suspense fallback={<RelatedArticlesSkeleton />}>
			<RelatedArticlesSSR />
		</Suspense>
	</div>
);
