const express = require('express');
const userRouter = require('./users/userRouter.js');
const server = express();

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] Request method: ${req.method} and Request URL: ${req.url}`);
  next();
}

server.use(express.json());
server.use(logger);
server.use('/api/users', userRouter); // everything in userRouter has /api/users

module.exports = server;
