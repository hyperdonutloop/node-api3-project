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
  
});

router.post('/:id/posts', (req, res) => {
  
});

router.get('/', validateUserId, (req, res) => {
  const userData = req.body;

  user.get(userData)
  .then(users => {
    res.status(200).json(users)
  })
  .catch(error => {
    res.status(500).json({ errorMessage: 'Error retrieving the users', error })
  })
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  user.getById(id)
  .then(user => {
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ errorMessage: 'The user does not exist'})
    }
  })
  .catch(error => {
    res.status(500).json({ errorMessage: 'Error retrieving user with specified ID', error})
  })
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
  const postData = req.body;

  if (!postData) {
    res.status(400).json({ errorMessage: 'missing post data' })
  } else if (!postData.text) {
    res.status(400).json({ errorMessage: 'missing required text field' })
  } else {
    next();
  }
}

module.exports = router;
