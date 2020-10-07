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
    console.log(fact);
    console.log('fact received')
    fact.data.type = 'fact';
    return fact.data
  })
}

const getJokes = () => {
 return axios.get('/data/jokes')
  .then(jokes => {
    console.log('joke received')
    jokes.data.forEach(joke => joke.type='joke');
    return jokes.data
  })
}

const getCuteGifs = () => {
  return axios.get('/data/cutegifs')
  .then(gifs => {
    console.log(gifs)
    return gifs.data.data.map(gif => ({'url': gif.images.fixed_height.url, 'type': 'gif'}))
  })
  .catch(err => console.log(err))
}

const getContent = () => {
 //get User and render according to goodie preferences
  let promises = [getJokes(), getCuteGifs()]
  return Promise.all(promises)
  .then(promises => promises.flat())
}

export { getContent, getNews }; 