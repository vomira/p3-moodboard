import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardImg,
  CardTitle,
  CardBody,
  CardFooter,
  Button,
} from "shards-react";

const NewsCard = ({ article }) => {

  return (
    article ? 
        <Card className="my-2">
          <CardHeader>News {article.source.name}</CardHeader>
          <CardImg src={article.urlToImage} style={{ maxHeight: "200px" }} />
          <CardBody>
            <CardTitle>{article.title}</CardTitle>
            <p>{article.description}</p>
            <Button theme="secondary">
              <a target="_blank" rel="noopener noreferrer" href={article.url}>
                Read More
              </a>
            </Button>
          </CardBody>
        </Card>
  :
  <></>
  )
};

export default NewsCard;
