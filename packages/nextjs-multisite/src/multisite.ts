import { type NextRequest, NextResponse } from "next/server";
import type { ConfigureMultisiteContext } from "./configure";
import { MultisiteError } from "./error";
import { resolveHeaders } from "./headers";
import { type InitialMultisiteHeaders, MultisiteHeader } from "./headers/types";
import { SiteDefinitionsHelper } from "./siteDefinitions/match";
import type { Host, SiteDefinition } from "./siteDefinitions/types";
import { MultisiteContextStep } from "./types";

export default class MultisiteContext<
	H extends string = InitialMultisiteHeaders,
> {
	private get ctx(): ConfigureMultisiteContext | null {
		return globalThis?.__OPTIMIZELY_MULTISITE_CONTEXT__;
	}

	private err(message: string) {
		return new MultisiteError(message, MultisiteContextStep.RESOLVE_SITE_PROPS);
	}

	public async resolveSiteProps(): Promise<Record<H, string>> {
		const siteDefinitions = await this.getSiteDefinitions();

		if (siteDefinitions.length === 0)
			throw this.err("No site definitions available");

		return (await resolveHeaders<H>()) as Record<H, string>;
	}

	public async proxy(request: NextRequest, init?: ResponseInit) {
		const siteDefinitions = await this.getSiteDefinitions();
		// find current host
		const helper = new SiteDefinitionsHelper(siteDefinitions);
		const requestHost =
			request.nextUrl.host || request.headers.get("host") || "";

		const match = helper.findMatchingHost(requestHost);
		if (!match)
			throw this.err(`No matching host found for request host: ${requestHost}`);
		const { host, site } = match;

		const masterLanguage = site.languages?.find(
			(lang) => lang.isMasterLanguage,
		);

		const headers = new Headers(request.headers);
		// set variables for siteId, language, etc. based on host
		headers.set(MultisiteHeader.SITE_ID, site.id || "");
		headers.set(
			MultisiteHeader.LANGUAGE,
			host.language?.name || masterLanguage?.name || "",
		);
		headers.set(MultisiteHeader.RELATIVE_PATH, request.nextUrl.pathname);
		headers.set(MultisiteHeader.CURRENT_HOST, host.name || "");
		if (masterLanguage)
			headers.set(MultisiteHeader.MASTER_LANGUAGE, masterLanguage.name);

		const response = NextResponse.next({
			...init,
			request: {
				...request,
				headers,
			},
		});

		return response;
	}

	private getSiteDefinitions = async (): Promise<SiteDefinition[]> => {
		if (!this.ctx) {
			throw this.err(
				"Multisite context is not configured. Please call configureMultisite first.",
			);
		}
		const result = await this.ctx.get();

		if (!result || !Array.isArray(result)) {
			throw this.err("Site definitions must be an array");
		}

		const validSiteDefinitions: SiteDefinition[] = [];
		for (const siteDef of result) {
			const hosts = siteDef.Hosts?.map(
				(host) =>
					({
						name: host.Name || "",
						language: {
							link: host.Language?.Link || "",
							displayName: host.Language?.DisplayName || "",
							name: host.Language?.Name || "",
						},
					}) satisfies Host,
			);

			validSiteDefinitions.push({
				id: siteDef.Id || "",
				hosts: hosts ?? [],
				name: siteDef.Name || "",
				contentLink: {
					id: siteDef.ContentLink?.Id || "",
				},
				languages:
					siteDef.Languages?.map((lang) => ({
						isMasterLanguage: lang.IsMasterLanguage || false,
						displayName: lang.DisplayName || "",
						name: lang.Name || "",
						urlSegment: lang.UrlSegment || "",
						url: lang.Url || "",
					})) || null,
				status: siteDef.Status,
			});
		}

		if (validSiteDefinitions.length === 0) {
			throw this.err("No valid site definitions found");
		}

		return validSiteDefinitions;
	};
}
