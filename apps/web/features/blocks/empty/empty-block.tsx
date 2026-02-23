export const EmptyBlock = ({ name }: { name: string }) => {
	if (process.env.NODE_ENV === "production") return null;

	return (
		<div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8">
			<p className="font-bold">{name} block is under development.</p>
			<p>Currently no view available</p>
		</div>
	);
};
