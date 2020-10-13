const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');

const { officersQueries } = require('./resolvers');
const { officersTypes } = require('./types');
const Officers = require('./models/Officers');
const { userMutation, userTypes, userTypeDefs, User } = require('ae-auth');

exports.createApolloServer = () => {
  const typeDefs = gql`
    ${officersTypes}
    ${userTypes}

    type Query {
      officers: [Officers]
      officer(id: ID): Officers
    }

    ${userTypeDefs}
  `;

  const resolvers = {
    Query: {
      ...officersQueries,
    },
    Mutation: {
      ...userMutation,
    },
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      models: {
        Officers: new Officers(mongoose.model('Officers')),
        User: new User(mongoose.model('User')),
      },
    }),
  });

  return apolloServer;
};
