import Link from "next/link";
import { sdk } from "~/core/graphql/sdk";
import { siteConfiguration } from "~/core/siteConfiguration";

export default async function StartPage() {
	const { siteId, language } = await siteConfiguration.details();
	const articles = await sdk.Articles({
		siteId,
		language,
		limit: 20,
	});

	return (
		<div>
			<h1>Start page</h1>
			<ul>
				{articles.WebPublicationArticlePage?.items?.map((article, index) => (
					<li key={article?.ContentLink?.GuidValue ?? index}>
						<Link href={article?.RelativePath || ""}>{article?.Name}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
