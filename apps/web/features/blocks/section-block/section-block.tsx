import { BlockArea } from "~/features/shared/components/block/block-area";

export const SectionBlock = (block: any) => {
	return (
		<div>
			<BlockArea blocks={block.SectionContent} />
		</div>
	);
};
