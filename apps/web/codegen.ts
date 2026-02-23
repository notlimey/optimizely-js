import type { CodegenConfig } from '@graphql-codegen/cli';
import { loadEnvConfig } from '@next/env';
import glob from 'fast-glob';

const loadEnvResult = loadEnvConfig(__dirname, undefined, console);
console.log(
	`  - Environments: ${loadEnvResult.loadedEnvFiles.map((x) => x.path).join(', ')}`,
);

const OPTIMIZELY_GRAPH_GATEWAY = process.env.OPTIMIZELY_GRAPH_GATEWAY;
const OPTIMIZELY_GRAPH_SINGLE_KEY = process.env.OPTIMIZELY_GRAPH_SINGLE_KEY;

const graphqlFilePath = [
	'./core/**/*.graphql',
	'./features/**/*.graphql',
];
const graphqlFiles = glob.sync(graphqlFilePath);
console.log(graphqlFiles)

const config: CodegenConfig = {
	generates: {
		'./__generated/graphql.schema.graphql': {
			plugins: ['schema-ast'],
		},
		'./__generated/graphql.schema.json': {
			plugins: ['introspection'],
		},
		'./__generated/graphql.sdk.ts': {
			config: {
				declarationKind: 'interface',
				dedupeFragments: true,
				exportFragmentSpreadSubTypes: true,
				fragmentVariablePrefix: '',
				fragmentVariableSuffix: 'Fragment',
				inlineFragmentTypes: 'combine',
				onlyOperationTypes: false,
				preResolveTypes: true,
				rawRequest: false,
				skipTypename: false,
			},
			documents: graphqlFiles,
			plugins: [
				'typescript',
				'typescript-operations',
				'typescript-graphql-request',
			],
		},
	},
	overwrite: true,
	schema: `${OPTIMIZELY_GRAPH_GATEWAY}/content/v2?auth=${OPTIMIZELY_GRAPH_SINGLE_KEY}&_=${Date.now()}`,
};

export default config;
