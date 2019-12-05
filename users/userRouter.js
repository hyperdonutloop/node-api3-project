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

router.post('/:id/posts', validatePost, (req, res) => {
  const id = req.params.id;
  // const newPost = req.body;
  const newPost = { user_id: req.params.id, text: req.body.text }
  user.getById(id)        // getting the user by the specific ID
  .then(user => {         // returns promise
    if (user) {           // that, if there is a user, then
      Posts.insert(newPost)  // use INSERT to add new post to database
      .then(post => {      // a promise --
        res.status(201).json(post) // --> to return the newly created Post
      }) 
      .catch(error => { 
        res.status(500).json({ errorMessage: 'Post cannot be created', error }) // if there is error with the first then
      })
    } else { // if there is no user found from line 27, then return 404
      res.status(404).json({ errorMessage: 'The user with the specified ID cannot be found' })
    }
  })
  .catch(error => { // if there is error with the whole thing, return 500
    res.status(500).json({ errorMessage: 'There was an error saving new post! Bummer.', error })
  })
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

router.get('/:id/posts', validateUserId, (req, res) => {
 const id = req.params.id;

 user.getUserPosts(id)
  .then(userPost => {
    if (userPost) {
      res.status(200).json(userPost)
    } else {
      res.status(404).json({ errorMessage: 'The post for this user could not be found' })
    }
  })
  .catch(error => {
    res.status(500).json({ errorMessage: 'error getting post information', error })
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  const id = req.params.id;

  user.remove(id)
  .then(user => {
    if (user) {
      res.status(200).json({ message: 'The user has been terminated!' })
    } else {
      res.status(404).json({ errorMessage: 'The user does not exist' })
    }
  })
  .catch(error => {
    res.status(500).json({ errorMessage: 'The user could not be removed', error })
  })
});

router.put('/:id', (req, res) => {
  const name = req.body;
  const id = req.params.id;

  if (!name) {
    res.status(400).json({ errorMessage: 'Please provide a name for the user!' })
  } else {
    user.update(id, name)
    .then(editedUser => {
      if (editedUser) {
        res.status(200).json(editedUser)
      } else {
        res.status(404).json({ errorMessage: 'The user with the specified ID could not be found' })
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: 'The user information could not be modified', error })
    })
  }
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
