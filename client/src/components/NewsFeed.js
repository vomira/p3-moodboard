import React, { useState, useEffect } from "react";
import AdviceCard from "./content/AdviceCard";
import FactCard from "./content/FactCard";
import GifCard from "./content/GifCard";
import JokeCard from "./content/JokeCard";
import NewsCard from "./content/NewsCard";
import PhilosophyCard from "./content/PhilosophyCard";
import { Col, Container, Row } from "shards-react";
import { shuffle } from "../services/shuffle";
import { getContent, getNews } from "../services/getContent";
import Loader from "../resources/loading.gif";

const NewsFeed = () => {

  const [articles, setArticles] = useState([]);
  const [randomFact, setRandomFacts] = useState([]);
  const [jokes, setJokes] = useState([]);
  const [content, setContent] = useState([]);
  
  useEffect(() => {
    if (window.localStorage.getItem("mood") === "good") {
      getNews().then((uniqueArticles) => {
        setContent([...content, ...uniqueArticles])
      });

    if (window.localStorage.getItem("mood") === "bad") {
        getContent().then((newContent) => {
          shuffle(newContent);
          setContent([...content, ...newContent])
        });
      }
  }}
  );

    let columns = {
      1: [],
      2: [],
      3: [],
    };

    if (content.length === 0) {
      return (
        <Container className="loader-container">
          <Row>
            <Col
              style={{
                height: "fit-content",
                display: "flex",
                flexDirection: "column",
              }}
              sm="12"
              md="12"
              lg="12"
            >
              <img className='loader-gif' src={Loader} alt="loader-gif" />
            </Col>
          </Row>
        </Container>
      );
    } else {

    content.forEach((item, index) => {
      let element;
      if (item.type === "news") {
        element = <NewsCard article={item} />;
      }
      if (item.type === "joke") {
        element = <JokeCard joke={item} />;
      }
      if (item.type === "fact") {
        element = <FactCard fact={item} />;
      }
      if (item.type === "gif") {
        element = <GifCard gif={item} />;
      }
      if (item.type === "philosophy") {
        element = <PhilosophyCard quote={item} />;
      }
      if (item.type === "advice") {
        element = <AdviceCard slip={item} />;
      }
      columns[(index % 3) + 1].push(element);
    });

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
            {columns["1"]}
          </Col>
          <Col style={{ height: "fit-content" }} sm="12" md="6" lg="4">
            {columns["2"]}
          </Col>
          <Col style={{ height: "fit-content" }} sm="12" md="6" lg="4">
            {columns["3"]}
          </Col>
        </Row>
      </Container>
    );
  }
  };

export default NewsFeed;