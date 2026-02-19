export interface SiteDefinition {
	id?: string | null;
	name?: string | null;
	status?: string | null;
	contentLink?: ContentLink | null;
	languages?: Language[] | null;
	hosts: Host[];
}

export interface ContentLink {
	id: string;
}

export interface Language {
	isMasterLanguage: boolean;
	displayName: string;
	name: string;
	urlSegment: string;
	url: string;
}

export interface Host {
	name: string;
	language?: HostLanguage;
}

export interface HostLanguage {
	link: string;
	displayName: string;
	name: string;
}

export interface HostWithReference extends Host {
	siteId: string;
}
