const express = require('express');
const router = express.Router();
const {
  createUser,
  getSingleUser,
  saveBook,
  deleteBook,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authenticateToken } = require('../../services/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authenticateToken, saveBook);

router.route('/login').post(login);

router.route('/me').get(authenticateToken, getSingleUser);

router.route('/books/:bookId').delete(authenticateToken, deleteBook);

module.exports = router;
