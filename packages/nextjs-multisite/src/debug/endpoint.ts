import { type NextRequest, NextResponse } from "next/server";
import { getGlobalMultisiteContext } from "../global";
import { resolveHeaders } from "../headers";

export const GET = async (request: NextRequest) => {
	const multisiteContext = getGlobalMultisiteContext();

	const props = await resolveHeaders(request.headers, {
		signatureSecret: multisiteContext.security.headerSignatureSecret,
	});

	console.log("Multisite context:", props);

	return NextResponse.json(props);
};
