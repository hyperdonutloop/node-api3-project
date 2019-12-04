const express = require('express');

const router = express.Router();

const user = require('../users/userDb.js');

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  user.getById(req.params.id)
    .then(users => {
      if (users) {
        req.user = user
        // res.status(200).json(user)
      } else {
        res.status(400).json({ errorMessage: 'invalid user ID' })
      }
    })
   next(); 
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
