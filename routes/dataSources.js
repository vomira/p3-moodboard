const express = require('express');
const router  = express.Router();
const axios = require('axios')



/* GET home page */
router.get('/newsapi', (req, res) => {
  axios.get('https://newsapi.org/v2/everything?q=environment&from=2020-09-28&to=2020-09-28&sortBy=popularity&apiKey=aebea22745824aa5b5f8f8cbaad036cb')
  .then((articles) => {
    res.status(200).json(articles.data.articles);
  })
  .catch(err => console.log(err))
}
)

router.get('/randomfact', (req, res) => {
  axios.get('https://uselessfacts.jsph.pl/random.json')
  .then((randomfact) => {
    res.status(200).json(randomfact.data);
  })
  .catch(err => console.log(err))
}
)

router.get('/joke', (req, res) => {
  axios.get('https://official-joke-api.appspot.com/random_joke')
  .then((joke) => {
    res.status(200).json(joke.data);
  })
  .catch(err => console.log(err))
})


module.exports = router;
