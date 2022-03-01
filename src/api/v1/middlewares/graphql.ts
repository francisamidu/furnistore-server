import { graphqlHTTP } from "express-graphql";

import schema from "../graphql/schema";
import rootResolver from "../graphql/resolvers/index";
import { GraphQLError } from "graphql";

const extensions = ({ operationName }: any) => {
  return {
    operationName,
  };
};

export default graphqlHTTP(() => {
  return {
    schema,
    rootValue: rootResolver,
    graphiql: true,
    pretty: true,
    customFormatErrorFn: (error: GraphQLError) => {
      return {
        message: error.message,
      };
    },
    extensions,
  };
});
