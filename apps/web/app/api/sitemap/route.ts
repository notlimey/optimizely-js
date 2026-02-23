import { NextResponse } from "next/server";

export const GET = async () => {
	return NextResponse.json([
		{
			url: `https://www.example.com/`,
			lastModified: new Date(),
		},
	]);
};
