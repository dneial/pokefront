import { GraphQLClient } from "graphql-request";

export const GRAPHQL_URL = "http://localhost:3000/graphql";
export const client = new GraphQLClient(GRAPHQL_URL, {
  jsonSerializer: {
    parse: JSON.parse,
    stringify: JSON.stringify,
  },
});
