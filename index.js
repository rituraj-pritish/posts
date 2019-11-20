const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const bodyParser = require('body-parser');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();
require('./config/db');
app.use(cors());
app.use(bodyParser.json());

server.applyMiddleware({ app, path: '/graphql' });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('listening'));
