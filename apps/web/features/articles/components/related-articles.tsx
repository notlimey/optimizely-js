'use client';
import Link from 'next/link';
import type { RelatedArticles as TRelatedArticles } from '../data/relatedArticles';

// For now this is not related just other articles on the same site
export const RelatedArticles = ({
	relatedArticles,
}: {
	relatedArticles: TRelatedArticles;
}) => (
	<div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
		{relatedArticles?.map((article) => (
			<Link
				key={article?.RelativePath}
				href={article?.RelativePath ?? ''}
				className="block rounded-md border p-4 transition-colors hover:bg-secondary/50"
			>
				<h4 className="font-bold text-lg">{article?.Name}</h4>
				<p className="text-gray-500 text-sm">{article?.RelativePath}</p>
			</Link>
		))}
	</div>
);
