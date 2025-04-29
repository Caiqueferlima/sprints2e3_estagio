require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const { router, dirname } = require('./routes/articleRoutes.js');

const server = express();
const port = process.env.SERVER_PORT || 8080;
const hostname = process.env.SERVER_HOSTNAME || '0.0.0.0';

server.use(cors());
server.use(express.json());
server.use(express.static(path.join(dirname, 'public')));
server.use('/', router);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log(`web running at http://127.0.0.1:5500/public/index.html`);
});
