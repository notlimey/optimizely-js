export const ArticleHeaderMetaInfo = ({
	publishedAt,
}: {
	publishedAt: string;
}) => {
	return (
		<div>
			<div>
				<span>Publisert: {publishedAt}</span>
			</div>
		</div>
	);
};
