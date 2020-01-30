const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');
const cloudinary = require('cloudinary').v2;

module.exports = {
  //jwt related
  hashPassword: async password => {
    return await bcrypt.hash(password, 10);
  },
  signToken: id => {
    return jwt.sign({ id }, keys.jwtKey, {
      expiresIn: '1day'
    });
  },
  getUserIdFromToken: async token => {
    const res = await jwt.verify(token, keys.jwtKey);
    return res.id;
  },
  verifyPassword: async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
  },

  //authorization related
  userExists: user => {
    if (!user) throw new Error('Unauthorized');
  },

  isSameUser: (user, currentUser) => {
    if (user.toString() !== currentUser.toString())
      throw new Error('Not authorized for this action');
  },

  //image related
  imageUpload: async createReadStream => {
    stream = createReadStream();

    let resultUrl;
    const cloudinaryUpload = async ({ stream }) => {
      try {
        await new Promise((resolve, reject) => {
          const streamLoad = cloudinary.uploader.upload_stream(function(
            error,
            result
          ) {
            if (result) {
              resultUrl = result.secure_url;
              resultSecureUrl = result.secure_url;
              resolve(resultUrl);
            } else {
              reject(error);
            }
          });

          stream.pipe(streamLoad);
        });
      } catch (err) {
        throw new Error(`Failed to upload image ! Err:${err.message}`);
      }
    };

    await cloudinaryUpload({ stream });

    return resultUrl;
  },

  imageUrlUpload: async imageUrl => {
    let resultUrl;
    await cloudinary.uploader.upload(imageUrl, (err, res) => {
      if (res) {
        resultUrl = res.secure_url;
      }
      if (err) throw new Error('Something went wrong');
    });
    return resultUrl;
  }
};
