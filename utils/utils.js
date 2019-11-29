const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');
const cloudinary = require('cloudinary').v2;

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
    return await jwt.verify(token, keys.jwtKey);
  },
  verifyPassword: async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
  },
  getUser: async req => {},

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
    await cloudinary.uploader.upload(
      'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      (err, res) => {
        if (res) {
          resultUrl = res.secure_url;
        }
        if (err) throw new Error('Something went wrong');
      }
    );
    return resultUrl;
  }
};
