import ExpandableXhtmlBlock from "~/features/blocks/expandable-xhtml-block";
import ExtendedXhtmlBlock from "~/features/blocks/extended-xhtml-block";
import { SectionBlock } from "~/features/blocks/section-block/section-block";
import { getBlock } from "~/features/shared/lib/getBlock";
import { NotImplementedBlockType } from "./not-implemented-block";

type BlockComponentProps = {
	contentGuid: string;
};

export const BlockComponent = async ({ contentGuid }: BlockComponentProps) => {
	const block = await getBlock(contentGuid);

	if (!block) return null;

	// did go a bit fast when i created this example repo, hope i can setup correct block mapping example later
	const props = block as any;

	switch (block.__typename) {
		case "ExpandableXhtmlBlock":
			return <ExpandableXhtmlBlock {...props} />;
		case "SectionBlock":
			return <SectionBlock {...props} />;
		case "ExtendedXhtmlBlock":
			return <ExtendedXhtmlBlock {...props} />;
	}

	return (
		<NotImplementedBlockType
			type={props.__typename}
			name={props.Name}
			content={block}
		/>
	);
};
