const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

router.post('/signup', (req, res) => {
  const { username, password } = req.body;

  if(!password || password.length < 8) {
    return res
    .status(400)
    .json({ message: 'Your password must be at least 8 characters long!'});
  }
  if(!username) {
    return res
    .status(400)
    .json({ message: 'Your username cannot be empty.'})
  }
  
  User.findOne({ username: username})
  .then(found => {
    if(found) {
      return res
      .status(400)
      .json({ message: 'This username is already taken' })
    }

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    return User.create({ username: username, password: hash})
    .then(user => {
      req.login(user, err => {
        if(err) {
          return res
          .status(500)
          .json({ message: 'Error while logging in' });
        }
        res.json(user);
      });
    })
    .catch(err => res.json(err));
  });
});

router.post('/login', (req, res) => {
  passport.authenticate('local', (err, user) => {
    if(err) {
      return res
      .status(500)
      .json({ message: 'Error while authenticating' });
    }
    if(!user) {
      return res
      .status(500)
      .json({ message: 'Wrong credentials' });
    }
    req.login(user, err => {
      if(err) {
        return res
        .status(500)
        .json({ message: 'Error while attempting to login'})
      }
      return res.json(user)
    });
  })(req, res);
});

router.delete('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Successful logout' });
})

router.get('/loggedin', (req, res) => {
  console.log('loggedin?')
  res.json(req.user);
});

module.exports = router;