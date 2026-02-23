import type { NextRequest } from 'next/server';
import { siteConfiguration } from '~/core/siteConfiguration';

export const GET = async (request: NextRequest) => {
	const siteProps = await siteConfiguration.details();

	return new Response(
		JSON.stringify({
			siteProps,
		}),
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);
};
