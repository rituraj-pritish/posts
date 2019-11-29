const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const bodyParser = require('body-parser');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const utils = require('./utils/utils');
const keys = require('./config/keys');
const cloudinary = require('cloudinary');

const requireLogin = id => {
  if (!id) {
    throw new Error('Login to continue');
  }
};

const isSameUser = (id, givenId) => {
  if (id.toString() !== givenId) {
    throw new Error('Not authorized');
  }
  return true;
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
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

cloudinary.config({
  cloud_name: keys.cloudinaryName,
  api_key: keys.cloudinaryKey,
  api_secret: keys.cloudinarySecret
});

const app = express();
require('./config/db');
app.use(cors());
app.use(bodyParser.json());

server.applyMiddleware({ app, path: '/graphql' });

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  //Express will serve up production assets like main.js file or main.css

  app.use(express.static('client/build'));
  //express will server up the index.html file if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname00, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log('listening'));
