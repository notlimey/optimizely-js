import type { ConfigureMultisiteOptions } from "./configuration/types";
import { MultisiteError } from "./error";
import { setGlobalMultisiteContext } from "./global";
import { baseHeaderSchema, type HeaderSchema } from "./headers";
import type { InitialMultisiteHeaders } from "./headers/types";
import MultisiteContext from "./multisite";
import { MultisiteContextStep } from "./types";

export interface ConfigureMultisiteContext extends ConfigureMultisiteOptions {
	headers?: HeaderSchema;
	client?: MultisiteContext;
}

export const configureMultisite = <T extends string = InitialMultisiteHeaders>(
	options: ConfigureMultisiteOptions,
) => {
	if (typeof window !== "undefined") {
		throw new MultisiteError(
			"configureMultisite should only be called on the server side",
			MultisiteContextStep.CONFIGURATION,
		);
	}

	if (globalThis?.__OPTIMIZELY_MULTISITE_CONTEXT__) {
		console.warn(
			"configureMultisite has already been called. Subsequent calls will overwrite the previous configuration.",
		);
	}

	const ctx: ConfigureMultisiteContext = {
		...options,
		headers: baseHeaderSchema,
	};

	setGlobalMultisiteContext(ctx);

	return new MultisiteContext<T>();
};
