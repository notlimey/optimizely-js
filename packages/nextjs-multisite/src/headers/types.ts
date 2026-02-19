export enum MultisiteHeader {
	SITE_ID = "siteId",
	LANGUAGE = "language",
	MASTER_LANGUAGE = "masterLanguage",
	CURRENT_HOST = "currentHost",
	RELATIVE_PATH = "relativePath",
}

export type InitialMultisiteHeaders =
	| MultisiteHeader.SITE_ID
	| MultisiteHeader.LANGUAGE
	| MultisiteHeader.RELATIVE_PATH
	| MultisiteHeader.MASTER_LANGUAGE
	| MultisiteHeader.CURRENT_HOST;
