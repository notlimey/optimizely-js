import RichText from "~/features/shared/components/rich-text";
import type { ContentByPathWithType } from "~/features/shared/lib/getContentByPath";

export const ArticleWebPublicationView = ({
	content,
}: {
	content: ContentByPathWithType<"WebPublicationArticlePage">;
}) => (
	<div className="t_page-wrapper t_landing-page t_article-page t_web-pub-article-page">
		<RichText data={content?.MainBody?.Structure ?? ""} />
	</div>
);
