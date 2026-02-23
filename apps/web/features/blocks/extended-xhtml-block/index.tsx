import RichText from "~/features/shared/components/rich-text";

const Index = (props: any) => {
	return (
		<div className="mx-auto w-full max-w-182">
			<RichText data={props?.Content?.Structure} />
		</div>
	);
};

export default Index;
