import type { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers.js";
import { headers as nextHeaders } from "next/headers";
import z from "zod";
import type { InitialMultisiteHeaders } from "./types";

export type HeaderSchema = Record<
	InitialMultisiteHeaders,
	{ required: boolean }
>;

export const baseHeaderSchema: HeaderSchema = {
	siteId: {
		required: true,
	},
	language: {
		required: true,
	},
	relativePath: {
		required: true,
	},
	currentHost: {
		required: true,
	},
	masterLanguage: {
		required: false,
	},
} as const;

export const baseSchema = z.object(
	Object.entries(baseHeaderSchema).reduce(
		(acc, [key, { required }]) => {
			acc[key as InitialMultisiteHeaders] = required
				? z.string().nonempty({ message: `${key} is required` })
				: z.string().optional();
			return acc;
		},
		{} as Record<InitialMultisiteHeaders, z.ZodType<string | undefined>>,
	),
);

export const resolveHeaders = async <
	T = Record<keyof typeof baseHeaderSchema, string>,
>(
	headers?: ReadonlyHeaders | Headers,
) => {
	headers ??= await nextHeaders();
	if (!headers)
		throw new Error("Headers are required but could not be resolved");

	const result = baseSchema.safeParse(
		Object.entries(baseHeaderSchema).reduce(
			(acc, [key]) => {
				acc[key as InitialMultisiteHeaders] = headers.get(key) ?? undefined;
				return acc;
			},
			{} as Record<InitialMultisiteHeaders, string | undefined>,
		),
	);

	if (!result.success) {
		throw new Error(`Invalid headers: ${result.error.message}`);
	}

	return result.data as T;
};
