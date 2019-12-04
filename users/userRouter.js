const express = require('express');

const router = express.Router();

const user = require('./userDb.js');

const Posts = require('../posts/postDb.js');

router.post('/', validateUserId, validateUser, (req, res) => {
  const userData = req.body; 

  user.insert(userData)
  .then(newUser => {
    res.status(201).json(newUser)
  })
  .catch(error => {
    res.status(500).json({ errorMessage: 'There was an error adding user.', error })
  })
  // if(!text || !user_id) {
  //   res.status(400).json({ errorMessage: 'Please provide text and user ID for post.' })
  // } else {
  //   Posts.insert(req.body)
  // .then(post => {
  //   res.status(201).json(post)
  // })
  // .catch(error => {
  //   res.status(500).json({ errorMessage: 'There was an error while saving post to database.', error })
  // })
  // }
  
});

router.post('/:id/posts', (req, res) => {
  
});

router.get('/', (req, res) => {
  
});

router.get('/:id', (req, res) => {
  
});

router.get('/:id/posts', (req, res) => {
  
});

router.delete('/:id', (req, res) => {
  
});

router.put('/:id', (req, res) => {
  
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
  const userData = req.body;

  if (!userData) {
    res.status(400).json({ errorMessage: 'missing user data'})
  } else if (!userData.name) {
    res.status(400).json({ errorMessage: 'missing required name field'})
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  
}

module.exports = router;
