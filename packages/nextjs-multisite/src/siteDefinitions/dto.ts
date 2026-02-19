export interface SiteDefinitionDTO {
	Id?: string | null;
	Name?: string | null;
	Status?: string | null;
	ContentLink?: SiteDefinitionContentLinkDTO | null;
	Languages?: SiteDefinitionHostLanguageDTO[] | null;
	Hosts?: SiteDefinitionHostDTO[] | null;
}

export interface SiteDefinitionContentLinkDTO {
	Id?: string;
}

export interface SiteDefinitionHostLanguageDTO {
	IsMasterLanguage?: boolean | null;
	DisplayName?: string | null;
	Name?: string | null;
	UrlSegment?: string | null;
	Url?: string | null;
}

export interface SiteDefinitionHostDTO {
	Name?: string | null;
	Language?: SiteDefinitionHostLanguage | null;
}

export interface SiteDefinitionHostLanguage {
	Link?: string | null;
	DisplayName?: string | null;
	Name?: string | null;
}
