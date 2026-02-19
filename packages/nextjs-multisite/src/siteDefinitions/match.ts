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

	/**
	 * Checks if a host matches the request host value
	 * Supports:
	 * - Wildcard: "*"
	 * - Port wildcard: "example.com:*"
	 * - Exact match: "example.com:8080" or "example.com"
	 */
	private matchesHostValue(host: Host, requestHost: string): boolean {
		const hostName = host.name || "";

		// Extract hostname without port from request
		const requestHostname = requestHost.split(":")[0];

		// Wildcard match
		if (hostName === "*") {
			return true;
		}

		// Port wildcard match (e.g., "example.com:*")
		if (hostName.includes(":*")) {
			const matchHostname = hostName.split(":")[0];
			return (
				!!requestHostname &&
				requestHostname.toLowerCase() === matchHostname?.toLowerCase()
			);
		}

		// Exact match (case-insensitive)
		return hostName.toLowerCase() === requestHost.toLowerCase();
	}

	/**
	 * Finds the best matching host for the given request host
	 * Priority order:
	 * 1. Exact match (case-insensitive)
	 * 2. Port wildcard match (hostname matches with :* pattern)
	 * 3. First match (typically wildcard "*")
	 *
	 * @param requestHost - The request host string (e.g., "example.com:8080" or "example.com")
	 * @returns The matching host and site definition
	 * @throws Error if no matching host is found
	 */
	public findMatchingHost(requestHost: string): HostWithSite | null {
		const matches: HostWithSite[] = [];

		// Find all matching hosts across all sites
		for (const site of this.results) {
			const hosts = site.hosts || [];
			for (const host of hosts) {
				if (this.matchesHostValue(host, requestHost)) {
					matches.push({ host, site });
				}
			}
		}

		const allHostNames = matches.map((match) => match.host.name).join(", ");

		// No matches found - throw error
		if (matches.length === 0) {
			throw new Error(
				`No matching host found for the request host.${allHostNames} - ${requestHost} - ${this.results?.length}`,
			);
		}

		// Priority 1: Exact match (case-insensitive)
		const exactMatch = matches.find(
			(match) => match.host.name?.toLowerCase() === requestHost.toLowerCase(),
		);
		if (exactMatch) {
			return exactMatch;
		}

		// Priority 2: Wildcard port match (e.g., "example.com:*" matches "example.com")
		const requestHostname = requestHost.split(":")[0];
		const wildcardMatch = matches.find((match) => {
			const hostName = match.host.name || "";
			if (hostName.includes(":*")) {
				const matchHostname = hostName.split(":")[0];
				return (
					!!requestHostname &&
					requestHostname.toLowerCase() === matchHostname?.toLowerCase()
				);
			}
			return false;
		});
		if (wildcardMatch) {
			return wildcardMatch;
		}

		// Priority 3: Return first match (typically wildcard "*")
		return matches[0] || null;
	}
}
