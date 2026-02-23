export enum OptimizelyNodeEnumType {
	RichText = "richText",
	HeadingOne = "heading-one",
	HeadingTwo = "heading-two",
	HeadingThree = "heading-three",
	Paragraph = "paragraph",
	BulletedList = "bulleted-list",
	NumberedList = "numbered-list",
	ListItem = "list-item",
	Link = "link",
	Image = "image",
	Content = "content", // custom block
}

export type OptimizelyNodeType =
	| OptimizelyNodeEnumType.RichText
	| OptimizelyNodeEnumType.HeadingOne
	| OptimizelyNodeEnumType.HeadingTwo
	| OptimizelyNodeEnumType.HeadingThree
	| OptimizelyNodeEnumType.Paragraph
	| OptimizelyNodeEnumType.BulletedList
	| OptimizelyNodeEnumType.NumberedList
	| OptimizelyNodeEnumType.ListItem
	| OptimizelyNodeEnumType.Link
	| OptimizelyNodeEnumType.Content // custom block
	| (string & {});

export type OptimizelyGenericNode = {
	type?: OptimizelyNodeType;
	text?: string;
	children?: OptimizelyNode[];

	// Link specific
	href?: string;

	// Text Marks (Slate.js style)
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;

	strikethrough?: boolean;

	// Content Block specific
	contentGuid?: string;
	contentType?: string[];
	name?: string;
};

export type OptimizelyImageNode = OptimizelyGenericNode & {
	type: OptimizelyNodeEnumType.Image;
	contentGuid: string;
	url?: string;
	alt?: string;
	width?: string;
	height?: string;
};

export type OptimizelyNode = OptimizelyGenericNode | OptimizelyImageNode;
