# Google Books Search Engine

A full-stack MERN application that allows users to search for books using the Google Books API and save them to their account. This application was refactored from a RESTful API to a GraphQL API using Apollo Server.

## Technologies Used

- MongoDB
- Express.js
- React
- Node.js
- GraphQL
- Apollo Server/Client
- JWT Authentication

## Deployment Instructions

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account if you don't have one already
2. Create a new cluster
3. Create a database user with read/write permissions
4. Add your IP address to the IP access list
5. Get your connection string from the "Connect" button

### Render Deployment

1. Create a Render account if you don't have one already
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure the following settings:
   - **Name**: google-books-search
   - **Environment**: Node
   - **Build Command**: `npm install && cd client && npm install && npm run build && cd ..`
   - **Start Command**: `npm run start`
5. Add the following environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET_KEY`: Your JWT secret key
   - `NODE_ENV`: production
6. Click "Create Web Service"

## Features

- Search for books using the Google Books API
- View book details including title, author, description, and image
- Save books to your account
- View your saved books
- Remove books from your saved list
- User authentication with JWT

## Screenshots

![Search Books](https://example.com/search-books.png)
![Saved Books](https://example.com/saved-books.png)

## License

This project is licensed under the MIT License.