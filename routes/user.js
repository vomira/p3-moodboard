const express = require('express');
const router  = express.Router();
const User = require('../models/User')


router.put('/update', (req, res) => {
  console.log(req.body);
  const { user, languages, goodies, newsPreferences } = req.body;
  const update = {};
  if(languages) {
    update.languages = languages;
  }
  if(goodies) {
    update.goodies = goodies;
  }
  if(newsPreferences) {
    update.newsPreferences = newsPreferences
  }
  User.findByIdAndUpdate(
    user._id,
    update,
    { new: true }
  ).then(user => {
    res.status(200).json(user);
  })
    .catch(error => {
      res.json(error)
    })
})

router.get('/getUser', (req, res) => {
  const userId = req.session.user._id;
  User.findById(userId)
  .then(user => res.status(200).json(user))
  .catch(err => console.log(err));
})



module.exports = router;