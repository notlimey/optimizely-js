export enum MultisiteHeader {
	SITE_ID = "x-opti-multisite-site-id",
	LANGUAGE = "x-opti-multisite-language",
	MASTER_LANGUAGE = "x-opti-multisite-master-language",
	CURRENT_HOST = "x-opti-multisite-current-host",
	RELATIVE_PATH = "x-opti-multisite-relative-path",
	MIDDLEWARE_APPLIED = "x-opti-multisite-middleware-applied",
	SIGNATURE = "x-opti-multisite-signature",
}

export type InitialMultisiteHeaders =
	| "siteId"
	| "language"
	| "relativePath"
	| "masterLanguage"
	| "currentHost";
