import RichText from "~/features/shared/components/rich-text";
import { ExpandableXhtmlBlock } from "./expandable-xhtml-block";

const Index = (props: any) => {
	return (
		<ExpandableXhtmlBlock {...props}>
			<RichText data={props.Content?.Structure} />
		</ExpandableXhtmlBlock>
	);
};

export default Index;
