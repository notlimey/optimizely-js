"use client";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useRef, useState } from "react";

export const ExpandableXhtmlBlock = ({ children, Content, ...block }: any) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const height = ref.current?.offsetHeight ?? 0;

	return (
		<div className="mx-auto my-4 w-full max-w-182 border-2 border-primary-160 p-4 transition-all">
			<button
				type="button"
				onClick={() => setIsExpanded(!isExpanded)}
				className="flex w-full items-center font-bold text-lg"
			>
				{isExpanded ? (
					<MinusIcon className="mr-2 size-4" />
				) : (
					<PlusIcon className="mr-2 size-4" />
				)}
				{block.Title}
			</button>

			<div
				className="mx-auto h-0 w-full max-w-182 overflow-hidden transition-all duration-300"
				style={{ height: isExpanded ? height : 0 }}
			>
				<div ref={ref} className="pb-5">
					{children}
				</div>
			</div>
		</div>
	);
};
