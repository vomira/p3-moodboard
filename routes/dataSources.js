const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User");
const moment = require("moment");

/* GET home page */

router.get("/newssources/:lang/:country", (req, res) => {
  axios
    .get(
      `https://newsapi.org/v2/sources?language=${req.params.lang}&country=${req.params.country}&apiKey=aebea22745824aa5b5f8f8cbaad036cb`
    )
    .then((sources) => {
      res.status(200).json(sources.data.sources);
    })
    .catch((err) => console.log(err));
});

router.get("/newsapi/:page", (req, res) => {
  const { page } = req.params;
  User.findById(req.user)
    .then((user) => {
      let prefStr = user.newsPreferences.join(",");
      let sources = prefStr;
      let firstDate = moment().subtract(1, "weeks").format("YYYY-MM-DD");
      let today = moment().format("YYYY-MM-DD");
      axios
        .get(
          "https://newsapi.org/v2/everything?" +
            "sources=" +
            sources +
            "&from=" +
            firstDate +
            "&to=" +
            today +
            "&page=" +
            page +
            "&sortBy=publishedAt&pageSize=100&apiKey=aebea22745824aa5b5f8f8cbaad036cb"
        )
        .then((articles) => {
          res.status(200).json(articles.data.articles);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.get("/randomfact", (req, res) => {
  axios
    .get('https://uselessfacts.jsph.pl/random.json')
    .then((randomfact) => {
      res.status(200).json(randomfact.data);
    })
    .catch((err) => console.log(err));
});

router.get('/advice', (req, res) => {
  axios.get('https://api.adviceslip.com/advice')
  .then(advice => {
    res.status(200).json(advice.data);
  })
  .catch(err => console.log(err))
})

router.get("/jokes", (req, res) => {
  axios
    .get("https://official-joke-api.appspot.com/random_ten")
    // .get("https://official-joke-api.appspot.com/random_joke")
    .then((joke) => {
      res.status(200).json(joke.data);
    })
    .catch((err) => console.log(err));
});

router.get("/philosophy", (req, res) => {
  axios.get("http://philosophy-quotes-api.glitch.me/quotes")
  .then((quote) => {
    res.status(200).json(quote.data);
  })
  .catch((err) => console.log(err))
})

router.get("/cutegifs", (req, res) => {
  axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_KEY}&q=cute&limit=20&offset=0&rating=g&lang=en`)
  .then((gifs) => {
    res.status(200).json(gifs.data);
  })
  .catch(err => console.log(err))
})

router.get("/funnygifs", (req, res) => {
  axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_KEY}&q=funny&limit=20&offset=0&rating=g&lang=en`)
  .then((gifs) => {
    res.status(200).json(gifs.data);
  })
  .catch(err => console.log(err))
})

module.exports = router;
