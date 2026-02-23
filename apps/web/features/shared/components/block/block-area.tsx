import { BlockComponent } from "~/features/shared/components/block/block-component";
import type { OptimizelyBaseBlock } from "~/features/shared/types/block";

type BlockAreaProps = {
	blocks?: null | (OptimizelyBaseBlock | undefined | null)[];
};

export const BlockArea = (props: BlockAreaProps) => {
	if (!props.blocks || props.blocks.length === 0) {
		return null;
	}

	const ids = props.blocks
		?.map((x) => x?.ContentLink?.GuidValue)
		.filter(Boolean) as string[];

	return (
		<div className="my-10">
			{ids.map((id, index) => (
				<BlockComponent
					contentGuid={id}
					// biome-ignore lint/suspicious/noArrayIndexKey: No identifiable key available on a block apparently?? Optimizely do better...
					key={`${id}-${index}`}
				/>
			))}
		</div>
	);
};
