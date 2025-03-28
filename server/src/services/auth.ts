const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Set token secret and expiration date
const secretKey = process.env.JWT_SECRET_KEY || 'mysecretsshhhhh';
const expiration = '1h';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      req.user = user;
      return next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

const signToken = (username, email, _id) => {
  const payload = { username, email, _id };
  return jwt.sign(payload, secretKey, { expiresIn: expiration });
};

module.exports = { authenticateToken, signToken };
