const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const faceDetection = require("../faceid/clarifai/clarifai");
const { analyzeFace, compareFaces } = require("../faceid/aws/rekognition")


router.post('/signupFID', (req, res) => {
  const { username, profileImg } = req.body;

  User.findOne({ username: username })
  .then(user => {
    if (user) {
      return res
        .status(400)
        .json({ message: 'This username is already taken' });
    }
  

  if(!username) return res.status(400).json({ message: 'Your username cannot be empty'})

  faceDetection(profileImg)
  .then(data => {
    if (data.outputs[0].data.regions[0].data.concepts[0].value < 0.9) return res.json({ message: "Sorry, there was no face detected in this photo."});
    if (data.outputs[0].data.regions[0].data.concepts[0].value >= 0.9) {
      let b64Img = profileImg.split(',')[1];
      analyzeFace(b64Img)
      .then(data => {
        let negativeScore = 0;
        let happyScore = 0;
        data.FaceDetails[0].Emotions.forEach(emotion => {
          if(emotion.Type === 'HAPPY') {
            happyScore += emotion.Confidence
          } else if (emotion.Type !== 'CALM' && emotion.Type !== 'SURPRISED') {
            negativeScore += emotion.Confidence
          }

        })
        console.log(negativeScore, happyScore);
        let mood = 'good'
        if(negativeScore > 5) {
          mood = 'bad'
        }
        // return res.json(mood);
        User.create({ username: username, profileImg: profileImg }).then(user => {
  
          return req.login(user, () => res.json({user, mood}))
          }
        );
      })
    }
  })
})
});

router.post('/signup', (req, res) => {
  const { username, password } = req.body;

  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ message: 'Your password must be 8 char. min.' });
  }
  if (!username) {
    return res.status(400).json({ message: 'Your username cannot be empty' });
  }

  User.findOne({ username: username })
    .then(found => {
      if (found) {
        return res
          .status(400)
          .json({ message: 'This username is already taken' });
      }

      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);

      return User.create({ username: username, password: hash }).then(
        dbUser => {

          req.login(dbUser, err => {
            if (err) {
              return res
                .status(500)
                .json({ message: 'Error while attempting to login' });
            }
            res.json(dbUser);
          });
        }
      );
    })
    .catch(err => {
      res.json(err);
    });
});

router.post('/loginFID', (req, res) => {
  const { username, loginImg } = req.body;
  User.findOne({username: username})
  .then(user => {
    if(!user) {
      res.json({ message: "This username does not exist"});
    }

    let sourceImg = user.profileImg.split(',')[1];
    let refImg = loginImg.split(',')[1];

    compareFaces(sourceImg, refImg)
    .then(data => {
      if (!data || !data.FaceMatches.length ) {
        return res.json({ 
          message: "Sorry, there aren't any faces in this photo that match the account holder." 
        })
      } else if (data.FaceMatches[0].Similarity > 95) {
        console.log("face match successfully");
        analyzeFace(refImg)
        .then(data => {
          let negativeEmotions = ['SAD', 'CONFUSED', 'ANGRY', 'FEAR', 'DISGUSTED'];
          let negativeScore = 0;
          let happyScore = 0;
          data.FaceDetails[0].Emotions.forEach(emotion => {
            if(emotion.Type === 'HAPPY') {
              happyScore += emotion.Confidence
            } else if (emotion.Type !== 'CALM' && emotion.Type !== 'SURPRISED') {
              negativeScore += emotion.Confidence
            }

          })
          console.log(negativeScore, happyScore);
          let mood = 'good'
          if(negativeScore > 5) {
            mood = 'bad'
          }
          // data.FaceDetails.forEach(data => {
          //   console.log("All other attributes:")
          //   console.log(`  Smile.Value:            ${data.Smile.Value}`)
          //   console.log(`  Smile.Confidence:       ${data.Smile.Confidence}`)
          //   data.Emotions.forEach(emotion => {
          //     console.log(`  Emotion.Type:       ${emotion.Type}`)
          //     console.log(`  Emotion.Confidence: ${emotion.Confidence}`)
          //   })
          //   console.log(`  Confidence:             ${data.Confidence}`)
          //   console.log("------------")
          //   console.log("")
          // })
          return req.login(user, () => res.json({user,mood}))
        })
        .catch(err => console.log(err))
        
      }
    })
    .catch(err => res.json({ message: "Sorry, that photo didn't come up as a match for the account holder."}))

  })
  .catch(err => console.log(err));
})


router.post('/login', (req, res) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error while authenticating' });
    }
    if (!user) {
      return res.status(400).json({ message: 'Wrong credentials' });
    }
    req.login(user, err => {
      if (err) {
        return res
          .status(500)
          .json({ message: 'Error while attempting to login' });
      }
      return res.json(user);
    });
  })(req, res);
});

router.delete("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Successful logout" });
});

router.get("/loggedin", (req, res) => {
  console.log("loggedin?");
  res.json(req.user);
});


module.exports = router;
