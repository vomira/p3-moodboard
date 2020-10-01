import React, { Component } from "react";
import FactCard from "./content/FactCard";
import NewsCard from "./content/NewsCard";
import { Container, Row } from 'shards-react';
import axios from 'axios';


export default class Main extends Component {

  state = {
    articles: [],
    randomFacts: []
  }

componentDidMount() {
    this.getNews();
    this.getRandomFacts();
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
    let factPromise = axios.get('/data/random');
    let arr = new Array(30).fill(factPromise);
    Promise.all(arr)
    .then(facts => {
      let copy = [...this.state.randomFacts];
      facts.map(fact => copy.push(fact.data));
      this.setState({ randomFacts: copy })
    })
  }

  // let articles = this.state.articles.map(article => <NewsCard article={article}/>
  // let facts = this.state.randomFacts.map(fact => <FactCard )

  render() {
    if(this.state.randomFacts.length === 0) return <></>
    return (
      <Container>
      <Row>
      {/* {this.state.articles.map(article => <NewsCard article={article}/>)} */}
      <FactCard fact={this.state.randomFacts[0]}/>
      </Row>
      </Container>
    );
  }
}
