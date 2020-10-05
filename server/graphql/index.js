const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');

const { officersQueries } = require('./resolvers');
const { officersTypes } = require('./types');
const Officers = require('./models/Officers');

exports.createApolloServer = () => {
  const typeDefs = gql`
    ${officersTypes}
    type Query {
      officers: [Officers]
      officer(id: ID): Officers
    }
  `;

  const resolvers = {
    Query: {
      ...officersQueries,
    },
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      models: {
        Officers: new Officers(mongoose.model('officers')),
      },
    }),
  });

  return apolloServer;
};
