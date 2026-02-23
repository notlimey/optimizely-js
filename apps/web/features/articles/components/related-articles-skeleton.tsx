/** biome-ignore-all lint/suspicious/noArrayIndexKey: Using index as key is acceptable here as the list is static and not reordered. */
'use client';

// For now this is not related just other articles on the same site
export const RelatedArticlesSkeleton = () => {
	return (
		<div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
			{Array.from({ length: 9 }).map((_, index) => (
				<div
					key={index}
					className="h-40 w-full animate-pulse rounded-md bg-gray-200"
				/>
			))}
		</div>
	);
};
