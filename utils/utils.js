const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');

module.exports = {
  hashPassword: async password => {
    return await bcrypt.hash(password, 10);
  },
  signToken: id => {
    return jwt.sign({ id }, keys.jwtKey, {
      expiresIn: '10days'
    });
  },
  verifyToken: async token => {
    return await jwt.verify(token, keys.jwtKey)
  },
  verifyPassword: async (password, hashPassword) => {
    return await bcrypt.compare(password,hashPassword)
  },
  getUser: async (req) => {

  }
};
