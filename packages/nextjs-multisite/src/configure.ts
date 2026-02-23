import type { ConfigureMultisiteOptions } from "./configuration/types";
import { MultisiteError } from "./error";
import { setGlobalMultisiteContext } from "./global";
import { baseHeaderSchema, type HeaderSchema } from "./headers";
import type { InitialMultisiteHeaders } from "./headers/types";
import OptiSiteConfiguration from "./siteConfiguration";
import { MultisiteContextStep } from "./types";

export interface SiteConfigurationContext extends ConfigureMultisiteOptions {
	headers?: HeaderSchema;
	client?: OptiSiteConfiguration;
}

export const createSiteConfiguration = <
	T extends string = InitialMultisiteHeaders,
>(
	options: ConfigureMultisiteOptions,
) => {
	if (typeof window !== "undefined") {
		throw new MultisiteError(
			"createSiteConfiguration should only be called on the server side",
			MultisiteContextStep.CONFIGURATION,
		);
	}
	if (!options.security?.headerSignatureSecret?.trim()) {
		throw new MultisiteError(
			"A non-empty security.headerSignatureSecret is required",
			MultisiteContextStep.CONFIGURATION,
		);
	}

	const ctx: SiteConfigurationContext = {
		...options,
		headers: baseHeaderSchema,
	};

	setGlobalMultisiteContext(ctx);

	return new OptiSiteConfiguration<T>();
};
