import type { SiteConfigurationContext } from "./configure";
import { MultisiteError } from "./error";
import { MultisiteContextStep } from "./types";

declare global {
	var __OPTIMIZELY_MULTISITE_CONTEXT__: SiteConfigurationContext | null;
}

export const getGlobalMultisiteContext = () => {
	const ctx = globalThis?.__OPTIMIZELY_MULTISITE_CONTEXT__;
	if (!ctx)
		throw new MultisiteError(
			"Multisite context has not been configured",
			MultisiteContextStep.CONFIGURATION,
		);

	return ctx;
};

export const setGlobalMultisiteContext = (ctx: SiteConfigurationContext) => {
	if (!globalThis)
		throw new MultisiteError(
			"Global object is not available",
			MultisiteContextStep.CONFIGURATION,
		);
	globalThis.__OPTIMIZELY_MULTISITE_CONTEXT__ = ctx;
	return ctx;
};
