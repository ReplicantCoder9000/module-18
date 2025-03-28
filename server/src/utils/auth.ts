import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string;
}

// Set token secret and expiration date
const secret = process.env.JWT_SECRET_KEY || 'mysecretsshhhhh';
const expiration = '2h';

export const authMiddleware = ({ req }) => {
  // Allows token to be sent via req.body, req.query, or headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  // ["Bearer", "<tokenvalue>"]
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return req;
  }

  // Verify token and get user data out of it
  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration }) as { data: JwtPayload };
    req.user = data;
  } catch {
    console.log('Invalid token');
  }

  // Return the request object so it can be passed to the resolver as `context`
  return req;
};

export const signToken = ({ username, email, _id }: JwtPayload) => {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};