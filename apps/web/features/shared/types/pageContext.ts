import type {
	ContentByPathTypename,
	ContentByPathWithType,
} from "../lib/getContentByPath";

export type PageContext = {
	path: string[];
	searchParams: Record<string, unknown>;
	relativePath: string;
};

export type PageProps<T extends ContentByPathTypename> = {
	content: ContentByPathWithType<T>;
};
