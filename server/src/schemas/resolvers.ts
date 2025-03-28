const { GraphQLError } = require('graphql');
const User = require('../models/User');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Get the logged in user
    me: async (_, __, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new GraphQLError('You need to be logged in!', { extensions: { code: 'UNAUTHENTICATED' } });
    },
  },

  Mutation: {
    // Create a user, sign a token, and send it back
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    // Login a user, sign a token, and send it back
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new GraphQLError('No user found with this email address', { extensions: { code: 'UNAUTHENTICATED' } });
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new GraphQLError('Incorrect credentials', { extensions: { code: 'UNAUTHENTICATED' } });
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    // Save a book to a user's `savedBooks` field
    saveBook: async (_, { bookData }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookData } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new GraphQLError('You need to be logged in!', { extensions: { code: 'UNAUTHENTICATED' } });
    },

    // Remove a book from `savedBooks`
    removeBook: async (_, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new GraphQLError('You need to be logged in!', { extensions: { code: 'UNAUTHENTICATED' } });
    },
  },
};

module.exports = resolvers;