import React, { Component } from "react";
import FactCard from "./content/FactCard";
import JokeCard from './content/JokeCard';
import NewsCard from "./content/NewsCard";
import { Col, Container, Row } from 'shards-react';
import axios from 'axios';


export default class Main extends Component {

  state = {
    articles: [],
    randomFacts: [],
    jokes: []
  }

componentDidMount() {
    this.getNews();
    this.getRandomFacts();
    this.getJokes();
  }

  getNews = () => {
    axios.get('/data/newsapi')
    .then(articles => {
      console.log(articles)
      this.setState({
        articles: articles.data
      });
    })
    .catch(err => console.log(err))
  }

  getRandomFacts = () => {
    let factPromise = axios.get('/data/randomfact');
    let arr = new Array(30).fill(factPromise);
    Promise.all(arr)
    .then(facts => {
      let copy = [...this.state.randomFacts];
      facts.map(fact => copy.push(fact.data));
      this.setState({ randomFacts: copy })
    })
  }

  getJokes = () => {
    let jokePromise = axios.get('/data/joke');
    let arr = new Array(30).fill(jokePromise);
    Promise.all(arr)
    .then(jokes => {
      let copy = [...this.state.jokes];
      jokes.map(joke => copy.push(joke.data));
      this.setState({ jokes: copy })
    })
   
  }


  render() {
    let articles = this.state.articles.map(article => <NewsCard style={{'margin': '20px'}} article={article}/>);
    let facts = this.state.randomFacts.map(fact => <FactCard fact={fact} />);
    let jokes = this.state.jokes.map(joke => <JokeCard joke={joke} />);
  

    if(this.state.randomFacts.length === 0) return <></>
    return (
      <Container>
      <Row>
      <Col style={{'height': 'fit-content', 'display':'flex', 'flex-direction': 'column'}} sm="12" lg="4">{articles[0]}{facts[0]}{jokes[0]}</Col>
      <Col style={{'height': 'fit-content'}} sm="12" lg="4">{facts[1]}{jokes[1]}{articles[1]}</Col>
      <Col style={{'height': 'fit-content'}} sm="12" lg="4">{jokes[2]}{articles[2]}{facts[2]}</Col>
      {/* <Col sm="12" lg="4">{articles[1]}</Col>
      <Col sm="12" lg="4">{facts[1]}</Col>
      <Col sm="12" lg="4">{jokes[1]}</Col> */}
      </Row>
      </Container>

    );
  }
}
