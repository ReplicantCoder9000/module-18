const express = require('express');
const path = require('path');
const router = express.Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// serve up react front-end in production
router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

module.exports = router;
