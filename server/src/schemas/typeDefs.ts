const { gql } = require('graphql-tag');

const typeDefs = gql`
  # Define which fields are accessible from the Book model
  type Book {
    bookId: String!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }

  # Define which fields are accessible from the User model
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  # Define the Auth type for returning data from login/signup
  type Auth {
    token: ID!
    user: User
  }

  # Define the input type for saving a book
  input BookInput {
    bookId: String!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }

  # Define which queries the front end can use
  type Query {
    me: User
  }

  # Define which mutations the front end can use
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;