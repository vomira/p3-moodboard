import React, { Component } from "react";
import AdviceCard from './content/AdviceCard';
import FactCard from "./content/FactCard";
import GifCard from './content/GifCard';
import JokeCard from "./content/JokeCard";
import NewsCard from "./content/NewsCard";
import PhilosophyCard from './content/PhilosophyCard';
import { Col, Container, Row } from "shards-react";
import axios from "axios";
import { shuffle } from '../services/shuffle';
import { getContent, getNews } from "../services/getContent";

export default class NewsFeed extends Component {
  state = {
    articles: [],
    randomFacts: [],
    jokes: [],
    content: [],
    numberOfUpdates: 1,
  };

  componentDidMount = () => {
    if (window.localStorage.getItem("mood") === "good") {
      getNews()
      .then((uniqueArticles) => {
        this.setState({
          content: [...this.state.content, ...uniqueArticles],
        });
      });
    }

    if (window.localStorage.getItem("mood") === "bad") {
      console.log('bad mood');
      getContent().then((newContent) => {
        console.log(newContent)
        shuffle(newContent);
        this.setState((state) => ({
          content: [...state.content, ...newContent]
        }));
      });
    }

    window.addEventListener("scroll", this.handleScroll, true);
  };

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.handleScroll);
  };

  handleScroll = () => {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
      console.log("You reached the bottom");
    }
  };

  // handleFetching = () => {
  //   if(window.localStorage.getItem('mood') === 'good') {
  //     console.log('Fetching Triggered');
  //     this.getNews(this.state.numberOfUpdates).then(() => {
  //       this.setState((state) => ({
  //         numberOfUpdates: state.numberOfUpdates + 1,
  //        }));
  //     }
  //     )
  //   }
  // }


  render() {
    let content = this.state.content;

    let columns = {
      1: [],
      2: [],
      3: []
    }


    if (content === 0) return <></>;

    content.forEach((item, index) => {
      let element;
      if(item.type === 'news') {
        element = <NewsCard article={item} />
      }
      if(item.type === 'joke') {
        element = <JokeCard joke={item} />
      }
      if(item.type === 'fact') {
        element = <FactCard fact={item} />
      }
      if(item.type === 'gif') {
        element = <GifCard gif={item} />
      }
      if(item.type === 'philosophy') {
        element = <PhilosophyCard quote={item}/>
      }
      if(item.type === 'advice') {
        element = <AdviceCard slip={item}/>
      }
      columns[(index%3+1)].push(element);
    })

    return (
      <Container>
        <Row>
          <Col
            style={{
              height: "fit-content",
              display: "flex",
              flexDirection: "column",
            }}
            sm="12"
            md="6"
            lg="4"
          >
            {columns['1']}
          </Col>
          <Col style={{ height: "fit-content" }} sm="12" md="6" lg="4">
            {columns['2']}
          </Col>
          <Col style={{ height: "fit-content" }} sm="12" md="6" lg="4">
            {columns['3']}
          </Col>
        </Row>
      </Container>
    );
  }
}
