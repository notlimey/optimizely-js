import type { Host, SiteDefinition } from "./types";

export interface HostWithSite {
	host: Host;
	site: SiteDefinition;
}

export class SiteDefinitionsHelper {
	private results: SiteDefinition[] = [];

	constructor(siteDefinitions: SiteDefinition[]) {
		this.results = siteDefinitions;
	}

	private matchesHostValue(host: Host, requestHost: string): boolean {
		const hostName = host.name || "";

		const requestHostname = requestHost.split(":")[0]?.toLowerCase();
		const matchHostname = hostName.split(":")[0]?.toLowerCase();
		if (!requestHostname) return false;

		if (hostName === "*") return true;
		if (hostName.includes(":*")) return requestHostname === matchHostname;
		return hostName.toLowerCase() === requestHost.toLowerCase();
	}

	public findMatchingHost(requestHost: string): HostWithSite | null {
		const matches: HostWithSite[] = [];

		for (const site of this.results) {
			const hosts = site.hosts || [];
			for (const host of hosts) {
				if (this.matchesHostValue(host, requestHost)) {
					matches.push({ host, site });
				}
			}
		}

		const allHostNames = matches.map((match) => match.host.name).join(", ");

		if (matches.length === 0) {
			throw new Error(
				`No matching host found for the request host.${allHostNames} - ${requestHost} - ${this.results?.length}`,
			);
		}

		const exactMatch = matches.find(
			(match) => match.host.name?.toLowerCase() === requestHost.toLowerCase(),
		);
		if (exactMatch) return exactMatch;

		const requestHostname = requestHost.split(":")[0]?.toLowerCase();
		const wildcardMatch = matches.find((match) => {
			const hostName = match.host.name || "";

			if (hostName.includes(":*")) {
				const matchHostname = hostName.split(":")[0]?.toLowerCase();
				return !!requestHostname && requestHostname === matchHostname;
			}

			return false;
		});
		if (wildcardMatch) return wildcardMatch;

		return matches[0] || null;
	}
}
