import type { Maybe } from '~/__generated/graphql.sdk';

type Props = {
	type: string;
	name?: Maybe<string>;
	message?: string;
};

export const ExceptionInBlockType = ({ type, name, message }: Props) => (
	<div className="mx-auto my-6 max-w-182 rounded-lg border border-red-300 bg-red-50 px-5 py-4 text-center text-gray-500 text-sm">
		<strong>Block not implemented:</strong> {type}
		{name && <p>Name: "{name}"</p>}
		{message && <p className="text-red-700">Message: "{message}"</p>}
	</div>
);
