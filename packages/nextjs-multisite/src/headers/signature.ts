import type { InitialMultisiteHeaders } from "./types";

type MultisiteSignatureInput = {
	values: Record<InitialMultisiteHeaders, string | undefined>;
	requestHost: string;
};

const encoder = new TextEncoder();

const toHex = (bytes: Uint8Array): string =>
	Array.from(bytes)
		.map((byte) => byte.toString(16).padStart(2, "0"))
		.join("");

export const createSignaturePayload = ({
	values,
	requestHost,
}: MultisiteSignatureInput): string => {
	const parts = [
		values.siteId || "",
		values.language || "",
		values.relativePath || "",
		values.currentHost || "",
		values.masterLanguage || "",
		requestHost || "",
	];

	return parts.join("|");
};

const hmacSha256Hex = async (
	secret: string,
	payload: string,
): Promise<string> => {
	const key = await crypto.subtle.importKey(
		"raw",
		encoder.encode(secret),
		{
			name: "HMAC",
			hash: "SHA-256",
		},
		false,
		["sign"],
	);

	const signature = await crypto.subtle.sign(
		"HMAC",
		key,
		encoder.encode(payload),
	);

	return toHex(new Uint8Array(signature));
};

export const createMultisiteSignature = async ({
	secret,
	payload,
}: {
	secret: string;
	payload: string;
}): Promise<string> => hmacSha256Hex(secret, payload);

export const verifyMultisiteSignature = async ({
	secret,
	payload,
	signature,
}: {
	secret: string;
	payload: string;
	signature: string;
}): Promise<boolean> => {
	const expected = await hmacSha256Hex(secret, payload);
	return expected === signature;
};
