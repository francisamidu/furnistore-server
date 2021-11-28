const { graphqlHTTP } = require("express-graphql");

const schema = require("../graphql/schema");
const rootResolver = require("../graphql/resolvers/index");

module.exports = graphqlHTTP({
  schema: schema,
  rootValue: rootResolver,
  graphiql: true,
  pretty: true,
  customFormatErrorFn: (error) => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack ? error.stack.split("\n") : [],
    path: error.path,
  }),
});
