import type { ContentByPathWithType } from "~/features/shared/lib/getContentByPath";
import { ArticleStandardView } from "./article-standard-view";

export default function ArticlePage({
	content,
}: {
	content: ContentByPathWithType<"WebPublicationArticlePage">;
}) {
	return <ArticleStandardView content={content} />;
}
