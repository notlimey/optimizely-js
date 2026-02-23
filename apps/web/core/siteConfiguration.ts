import {
	createSiteConfiguration,
	type SiteDefinitionDTO,
} from "@notlimey/optimizely-nextjs-multisite";
import { sdk } from "./graphql/sdk";

export const siteConfiguration = createSiteConfiguration({
	security: {
		headerSignatureSecret: process.env.OPTIMIZELY_MULTISITE_HEADER_SECRET ?? "",
	},
	get: async () => {
		const res = await sdk.SiteStructure();
		return (res.SiteDefinition?.items || []) as SiteDefinitionDTO[];
	},
});
