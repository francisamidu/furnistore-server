import { graphqlHTTP } from "express-graphql";

import schema from "../graphql/schema";
import rootResolver from "../graphql/resolvers/index";
import { GraphQLError } from "graphql";

export default graphqlHTTP({
  schema: schema,
  rootValue: rootResolver,
  graphiql: true,
  pretty: true,
  customFormatErrorFn: (error: GraphQLError) => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack ? error.stack.split("\n") : [],
    path: error.path,
  }),
});
