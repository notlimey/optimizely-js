import type { SiteDefinitionDTO } from "../siteDefinitions/dto";
import type { Host, HostWithReference } from "../siteDefinitions/types";

export type GetSiteDefinitionsFunction = () => Promise<SiteDefinitionDTO[]>;

export type DefaultHostMatchingFunction = {
	type?: never;
	func: (host: Host, requestHost: string) => boolean;
};

export type FindBestHostMatchingFunction = {
	type: "findBestMatch";
	func: (
		hosts: HostWithReference[],
		requestHost: string,
	) => HostWithReference | null;
};

export type HostMatchingFunction =
	| DefaultHostMatchingFunction
	| FindBestHostMatchingFunction;

export type ConfigureMultisiteOptions = {
	get: GetSiteDefinitionsFunction;
	host?: {
		match?: HostMatchingFunction;
	};
	hooks?: {
		afterResolveSiteDefinitions?: (
			siteDefinitions: SiteDefinitionDTO[],
		) => Promise<void> | void;
	};
};
