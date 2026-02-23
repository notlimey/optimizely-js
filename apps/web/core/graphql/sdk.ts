import { getSdk } from '~/__generated/graphql.sdk';
import { graphqlClient } from '~/core/graphql/client';

export const sdk = getSdk(graphqlClient);
