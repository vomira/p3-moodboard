const express = require('express');
const router = express.Router();
const User = require('../models/User');
const s3UploadPicture = require('../aws/s3');

router.post('/signup', (req, res) => {

  const { user, profileImg } = req.body;
  s3UploadPicture(profileImg, user);
})

module.exports = router;

