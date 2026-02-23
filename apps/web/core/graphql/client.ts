import { GraphQLClient } from "graphql-request";

const OPTIMIZELY_GRAPH_ENDPOINT = `${process.env.OPTIMIZELY_GRAPH_GATEWAY}/content/v2?auth=${process.env.OPTIMIZELY_GRAPH_SINGLE_KEY}`;

export const graphqlClient = new GraphQLClient(OPTIMIZELY_GRAPH_ENDPOINT);
