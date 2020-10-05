import React, { Component } from "react";
import FactCard from "./content/FactCard";
import JokeCard from './content/JokeCard';
import NewsCard from "./content/NewsCard";
import { Col, Container, Row } from 'shards-react';
import axios from 'axios';


export default class NewsFeed extends Component {

  state = {
    articles: [],
    randomFacts: [],
    jokes: [],
    content: [],
    numberOfUpdates: 1
  }

componentDidMount = () => {
  if(window.localStorage.getItem('mood') === 'good') {
    this.getNews(this.state.numberOfUpdates);
    this.setState((state) => ({numberOfUpdates: state.numberOfUpdates + 1 }))
  }
  if(window.localStorage.getItem('mood') === 'good') {
    this.getRandomFacts();
    this.getJokes();
  }

    window.addEventListener('scroll', this.handleScroll, true);
  }
  
  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
          this.handleFetching()
      }
  }

  handleFetching = () => {
    if(window.localStorage.getItem('mood') === 'good') {
      console.log('Fetching Triggered');
      this.getNews(this.state.numberOfUpdates)
      this.setState((state) => ({
        numberOfUpdates: state.numberOfUpdates + 1,
       }));

    }
  }

  getNews = (page) => {
    axios.get(`/data/newsapi/${page}`)
    .then(articles => {
      console.log(articles);
      articles.data.forEach(article => article.type='news');
      let uniqueArticles = [];
      articles.data.map(article => uniqueArticles.some(uArt => uArt.url === article.url) ? '' : uniqueArticles.push(article));
      this.setState({
        articles: [...this.state.articles, ...uniqueArticles]
        // content: [...this.state.content, ...uniqueArticles] })
    })
  })
    .catch(err => console.log(err))
  }

  getRandomFacts = () => {
    let factPromise = axios.get('/data/randomfact');
    let arr = new Array(20).fill(factPromise);
    Promise.all(arr)
    .then(facts => {
      let copy = [...this.state.randomFacts];
      facts.map(fact => {
        fact.data.type='fact';
        copy.push(fact.data)});
      this.setState({ randomFacts: copy })
    })
  }

  getJokes = () => {
    let jokePromise = axios.get('/data/joke');
    let arr = new Array(20).fill(jokePromise);
    Promise.all(arr)
    .then(jokes => {
      let copy = [...this.state.jokes];
      jokes.map(joke => {
        joke.data.type='joke';
        copy.push(joke.data)
      });
      this.setState({ jokes: copy })
    })
   
  }


  render() {
    let content = this.state.randomFacts.concat(this.state.jokes)
    let articles = this.state.articles.map(article => <NewsCard article={article}/>);
    let facts = this.state.randomFacts.map(fact => <FactCard fact={fact} />);
    let jokes = this.state.jokes.map(joke => <JokeCard joke={joke} />);
  
    let column1 = [];
    let column2 = [];
    let column3 = [];

    if(content === 0) return <></>


    for(let i = 0; i < content.length; i+=3) {
      column1.push(articles[i]);
      column2.push(articles[i+1]);
      column3.push(articles[i+2]);
    }

    return (
      <Container>
      <Row>
      <Col style={{'height': 'fit-content', 'display':'flex', 'flexDirection': 'column'}} sm="12" md="6" lg="4">{column1}</Col>
      <Col style={{'height': 'fit-content'}} sm="12" md="6" lg="4">{column2}</Col>
      <Col style={{'height': 'fit-content'}} sm="12" md="6" lg="4">{column3}</Col>
      </Row>
      </Container>

    );
  }
}
