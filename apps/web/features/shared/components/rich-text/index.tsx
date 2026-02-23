import { createElement, type ElementType } from "react";
import type { OptimizelyNode } from "../../types/richText";
import { BlockComponent } from "../block/block-component";

// Leaf Nodes (Text)
const renderLeaf = (node: OptimizelyNode, index: number) => {
	if (!node.text) return null;

	// biome-ignore lint/security/noDangerouslySetInnerHtml: Content is sanitized before being stored in Optimizely
	let children = <span dangerouslySetInnerHTML={{ __html: node.text }} />;

	if (node.bold) children = <strong>{children}</strong>;
	if (node.italic) children = <em>{children}</em>;
	if (node.underline) children = <u>{children}</u>;
	if (node.strikethrough) children = <s>{children}</s>; // common in Slate

	return <span key={index}>{children}</span>;
};

const elementTypeToTag: Record<string, ElementType> = {
	"heading-one": "h1",
	"heading-two": "h2",
	"heading-three": "h3",
	"heading-four": "h4",
	"heading-five": "h5",
	"heading-six": "h6",
	paragraph: "p",
	image: "img",
};

const OptimizelyNodeRenderer = ({ node }: { node: OptimizelyNode }) => {
	if (node.text !== undefined) {
		return <>{renderLeaf(node, 0)}</>;
	}

	const children = node.children?.map((child, i) => (
		// biome-ignore lint/suspicious/noArrayIndexKey: No identifiable key available on a node or its children
		<OptimizelyNodeRenderer key={i} node={child} />
	));

	switch (node.type) {
		case "richText":
			return <div className="richtext prose mt-0.5 max-w-none">{children}</div>;

		case "paragraph":
			return <p className="text-gray-800 leading-relaxed">{children}</p>;

		case "bulleted-list":
			return <ul className="mt-0.5 mb-4 list-disc pl-6">{children}</ul>;
		case "numbered-list":
			return <ol className="mt-0.5 mb-4 list-decimal pl-6">{children}</ol>;
		case "list-item":
			return <li className="mt-0.5">{children}</li>;

		case "link":
			return (
				<a href={node.href} className="text-blue-600 hover:underline">
					{children}
				</a>
			);
		case "table":
			return <table className="my-4">{children}</table>;

		case "content":
			if (!node.contentGuid) return null;
			return <BlockComponent contentGuid={node.contentGuid} />;

		case "br":
			return <br />;

		default: {
			console.warn("Unknown node type:", node.type);
			if (typeof node.type === "string") {
				const Tag = elementTypeToTag[node.type] || node.type;

				return createElement(Tag, node, children);
			}

			return <>{children}</>;
		}
	}
};

export default function RichText({ data }: { data: OptimizelyNode }) {
	if (!data) return null;

	return <OptimizelyNodeRenderer node={data} />;
}
