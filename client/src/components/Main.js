import React, { Component } from "react";
import FactCard from "./content/FactCard";
import JokeCard from './content/JokeCard';
import NewsCard from "./content/NewsCard";
// import { shuffle } from '../services/shuffle';
import { Col, Container, Row } from 'shards-react';
import axios from 'axios';


export default class Main extends Component {

  state = {
    articles: [],
    randomFacts: [],
    jokes: [],
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
    let arr = new Array(20).fill(factPromise);
    Promise.all(arr)
    .then(facts => {
      let copy = [...this.state.randomFacts];
      facts.map(fact => copy.push(fact.data));
      this.setState({ randomFacts: copy })
    })
  }

  getJokes = () => {
    let jokePromise = axios.get('/data/joke');
    let arr = new Array(20).fill(jokePromise);
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
  
    let column1 = [];
    let column2 = [];
    let column3 = [];

    // let contentTypes = shuffle([facts, jokes]);
    
    

    // console.log(column1);

    if(this.state.randomFacts.length === 0) return <></>

    // console.log(shuffle(contentTypes)[0][1]);

    // for(let i = 0; i < this.state.articles.length; i++) {
    //   column1.push(shuffle(contentTypes)[0][i]);
    //   column2.push(shuffle(contentTypes)[1][i]);
    //   column3.push(shuffle(contentTypes)[0][i]);
    // }

    for(let i = 0; i < this.state.articles.length; i+=3) {
      column1.push(articles[i]);
      column2.push(articles[i+1]);
      column3.push(articles[i+2]);
    }

    console.log(column1);
    console.log(column2);
    console.log(column3);
    
    return (
      <Container>
      <Row>
      <Col style={{'height': 'fit-content', 'display':'flex', 'flexDirection': 'column'}} sm="12" lg="4">{column1}</Col>
      <Col style={{'height': 'fit-content'}} sm="12" lg="4">{column2}</Col>
      <Col style={{'height': 'fit-content'}} sm="12" lg="4">{column3}</Col>
      </Row>
      </Container>

    );
  }
}
