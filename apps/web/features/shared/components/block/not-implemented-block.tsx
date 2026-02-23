"use client";
import { InfoIcon } from "lucide-react";
import { useState } from "react";
import type { Maybe } from "~/__generated/graphql.sdk";

type Props = {
	type: string;
	name?: Maybe<string>;
	// biome-ignore lint/suspicious/noExplicitAny: Content is just rendered as JSON and therefore can be any shape
	content?: Record<string, any>;
};
export const NotImplementedBlockType = ({ type, name, content }: Props) => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<>
			<div className="mx-auto my-6 max-w-182 rounded-lg border bg-gray-50 px-5 py-4 text-center text-gray-500 text-sm">
				<button
					type="button"
					className="float-right text-gray-400 hover:text-gray-600"
					onClick={() => setIsExpanded((s) => !s)}
				>
					<InfoIcon className="size-3" />
				</button>
				<strong>Block not implemented:</strong> {type}
				{name && <p>Name: "{name}"</p>}
			</div>
			{isExpanded && (
				<div className="mx-auto my-6 max-w-182 rounded-lg border bg-gray-50 px-5 py-4 text-gray-500 text-sm">
					<pre>{JSON.stringify({ type, name, content }, null, 2)}</pre>
				</div>
			)}
		</>
	);
};
