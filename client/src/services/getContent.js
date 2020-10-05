getNews = (page) => {
  axios.get(`/data/newsapi/${page}`)
  .then(articles => {
    console.log(articles);
    articles.data.forEach(article => article.type='news');
    let uniqueArticles = [];
    articles.data.map(article => uniqueArticles.some(uArt => uArt.url === article.url) ? '' : uniqueArticles.push(article));
    this.setState({
      // articles: uniqueArticles
      content: [...this.state.content, ...uniqueArticles] })
  })
  .catch(err => console.log(err))
}


getRandomFacts = () => {
  let factPromise = axios.get('/data/randomfact');
  let arr = new Array(20).fill(factPromise);
  Promise.all(arr)
  .then(facts => {
   return factsData = facts.map(fact => fact.data.type='fact')
}

getJokes = () => {
  let jokePromise = axios.get('/data/joke');
  let arr = new Array(20).fill(jokePromise);
  Promise.all(arr)
  .then(jokes => {
    return jokesData = jokes.map(joke => joke.data.type='joke')
  })
 
}


getGoodies = () => {
  

}