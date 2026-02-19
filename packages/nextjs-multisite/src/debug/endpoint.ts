import { type NextRequest, NextResponse } from "next/server";
import { MultisiteHeader } from "../headers/types";

export const GET = async (request: NextRequest) => {
	const props = {
		[MultisiteHeader.SITE_ID]: request.headers.get(MultisiteHeader.SITE_ID),
		[MultisiteHeader.LANGUAGE]: request.headers.get(MultisiteHeader.LANGUAGE),
		[MultisiteHeader.RELATIVE_PATH]: request.headers.get(
			MultisiteHeader.RELATIVE_PATH,
		),
		[MultisiteHeader.MASTER_LANGUAGE]: request.headers.get(
			MultisiteHeader.MASTER_LANGUAGE,
		),
		[MultisiteHeader.CURRENT_HOST]: request.headers.get(
			MultisiteHeader.CURRENT_HOST,
		),
	};
	console.log("Multisite context:", props);

	return NextResponse.json(props);
};
