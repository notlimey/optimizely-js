import type { NextRequest } from "next/server";
import { siteConfiguration } from "./core/siteConfiguration";

export const proxy = async (request: NextRequest) => {
	return siteConfiguration.handleProxy(request);
};

export const config = {
	matcher: [
		"/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|manifest.json|manifest.webmanifest|.*\\.svg|.*\\.ico|issue|.*\\.png$).*)",
	],
};
