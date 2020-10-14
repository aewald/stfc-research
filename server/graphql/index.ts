import mongoose from 'mongoose';
import { ApolloServer, gql } from 'apollo-server-express';

import { officersQueries } from './resolvers';
import { officersTypes } from './types';
import { Officers } from './models/Officers';
import { buildAuthContext, userMutation, userTypes, userTypeDefs, User } from 'ae-auth';

export const createApolloServer = () => {
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
      ...buildAuthContext(),
      models: {
        Officers: new Officers(mongoose.model('Officers')),
        User: new User(mongoose.model('User')),
      },
    }),
  });

  return apolloServer;
};
