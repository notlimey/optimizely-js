import type { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers.js";
import { headers as nextHeaders } from "next/headers";
import { MultisiteContextStep, MultisiteError } from "~/types";
import { type InitialMultisiteHeaders, MultisiteHeader } from "./types";
import {
	createSignaturePayload,
	verifyMultisiteSignature,
} from "./signature";

export type HeaderSchema = Record<
	InitialMultisiteHeaders,
	{ required: boolean; internalHeader: MultisiteHeader }
>;

export const baseHeaderSchema: HeaderSchema = {
	siteId: {
		required: true,
		internalHeader: MultisiteHeader.SITE_ID,
	},
	language: {
		required: true,
		internalHeader: MultisiteHeader.LANGUAGE,
	},
	relativePath: {
		required: true,
		internalHeader: MultisiteHeader.RELATIVE_PATH,
	},
	currentHost: {
		required: true,
		internalHeader: MultisiteHeader.CURRENT_HOST,
	},
	masterLanguage: {
		required: false,
		internalHeader: MultisiteHeader.MASTER_LANGUAGE,
	},
} as const;

export const resolveHeaders = async <
	T = Record<keyof typeof baseHeaderSchema, string>,
>(
	headers?: ReadonlyHeaders | Headers,
	options?: { signatureSecret: string },
): Promise<T> => {
	headers ??= await nextHeaders();
	if (!headers)
		throw new MultisiteError(
			"Headers are required but could not be resolved",
			MultisiteContextStep.HEADERS,
		);
	if (!options?.signatureSecret)
		throw new MultisiteError(
			"Missing signature secret for multisite headers",
			MultisiteContextStep.HEADERS,
		);

	const middlewareApplied = headers.get(
		MultisiteHeader.MIDDLEWARE_APPLIED,
	);
	if (middlewareApplied !== "1")
		throw new MultisiteError(
			"Multisite middleware header marker is missing",
			MultisiteContextStep.HEADERS,
		);

	const result: Record<InitialMultisiteHeaders, string | undefined> =
		{} as Record<InitialMultisiteHeaders, string | undefined>;
	const errors: string[] = [];

	for (const [key, { required, internalHeader }] of Object.entries(
		baseHeaderSchema,
	)) {
		const value = headers.get(internalHeader);
		if (required && !value) errors.push(`${key} is required`);
		result[key as InitialMultisiteHeaders] = value ?? undefined;
	}

	if (errors.length > 0)
		throw new MultisiteError(
			`Invalid headers: ${errors.join(", ")}`,
			MultisiteContextStep.HEADERS,
		);

	const requestHost = headers.get("host");
	if (!requestHost)
		throw new MultisiteError(
			"Host header is missing for multisite verification",
			MultisiteContextStep.HEADERS,
		);

	const signature = headers.get(MultisiteHeader.SIGNATURE);
	if (!signature)
		throw new MultisiteError(
			"Multisite signature header is missing",
			MultisiteContextStep.HEADERS,
		);

	const signaturePayload = createSignaturePayload({
		values: result,
		requestHost,
	});
	const signatureValid = await verifyMultisiteSignature({
		secret: options.signatureSecret,
		payload: signaturePayload,
		signature,
	});
	if (!signatureValid)
		throw new MultisiteError(
			"Invalid multisite signature",
			MultisiteContextStep.HEADERS,
		);

	return result as T;
};
