const path = require('path');
const express = require('express');
const {
  articleSearchController,
  articlePopularController,
} = require('../controllers/articleController.js');

const router = express.Router();
const dirname = path.resolve();

router.get('/articles', articleSearchController);
router.get('/popular', articlePopularController);

router.get('/', (_, response) => {
  response.sendFile(path.join(dirname, 'public', 'index.html'));
});

module.exports = { router, dirname };
