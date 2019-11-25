const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const bodyParser = require('body-parser');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const utils = require('./utils/utils');

const requireLogin = (id) => {
  if(!id) {
    throw new Error('Login to continue')
  }
}

const isSameUser = (id, givenId) => {
  if(id.toString() !== givenId) {
    throw new Error('Not authorized')
  }
  return true
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization;
    if (token) {
      const { id } = await utils.verifyToken(token);
      if (!id) throw new Error('Invalid token');

      return { userId: id, requireLogin, isSameUser };
    }
    return { userId: null, requireLogin, isSameUser };
  }
});

const app = express();
require('./config/db');
app.use(cors());
app.use(bodyParser.json());

server.applyMiddleware({ app, path: '/graphql' });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('listening'));
