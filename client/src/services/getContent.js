import axios from 'axios';


const getNews = (page) => {
  return axios.get(`/data/newsapi/${page}`)
  .then(articles => {
    articles.data.forEach(article => article.type='news');
    let uniqueArticles = [];
    articles.data.map(article => uniqueArticles.some(uArt => uArt.title === article.title) ? '' : uniqueArticles.push(article));
    return uniqueArticles;
  })
  .catch(err => console.log(err))
}


const getFact = () => {
 return axios.get('/data/randomfact')
  .then(fact => {
    console.log(fact.data);
    // console.log('fact received')
    fact.data.type = 'fact';
    return fact.data
  })
}

const getJokes = () => {
 return axios.get('/data/jokes')
  .then(jokes => {
    // console.log('joke received')
    jokes.data.forEach(joke => joke.type='joke');
    return jokes.data
  })
}

const getCuteGifs = () => {
  return axios.get('/data/cutegifs')
  .then(gifs => {
    // console.log(gifs)
    return gifs.data.data.map(gif => ({'url': gif.images.original.url, 'type': 'gif'}))
  })
  .catch(err => console.log(err))
}

const getFunnyGifs = () => {
  return axios.get('/data/funnygifs')
  .then(gifs => {
    // console.log(gifs)
    return gifs.data.data.map(gif => ({'url': gif.images.original.url, 'type': 'gif'}))
  })
  .catch(err => console.log(err))
}

const getPhilosophy = () => {
  return axios.get('/data/philosophy')
  .then(quotes => {
    // console.log(quotes.data, 'quotes received');
    quotes.data.map(quote => quote.type='philosophy')
    return quotes.data
  })
}

const getAdvice = () => {
  return axios.get('/data/advice')
  .then(advice => {
    advice.data.slip.type = 'advice';
    return advice.data.slip
  })
}

const getContent = () => {
 //get User and render according to goodie preferences
  let promises = [getJokes(), getCuteGifs(), getFunnyGifs(), getPhilosophy(), getAdvice(), getAdvice(), getAdvice(), getAdvice(), getAdvice(), getAdvice(), getAdvice(),getFact(), getFact(), getFact(), getFact(), getFact(), getFact(), getFact(), getFact(), getFact(), getFact(), getFact(), getFact(), getFact()]
  return Promise.all(promises)
  .then(promises => promises.flat())
}

export { getContent, getNews }; 