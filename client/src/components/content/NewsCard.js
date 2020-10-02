import React, { Component } from "react";
import './NewsCard.css'
import {
  Card,
  CardHeader,
  CardImg,
  CardTitle,
  CardBody,
  CardFooter,
  Button
} from "shards-react";

export default class NewsCard extends Component {

render() {
  let article = this.props.article;
  if(!article) {return <></>}
  return (
        <Card className='my-2' >
        <CardHeader>News {article.source.name}</CardHeader>
        <CardImg src={article.urlToImage} style={{'maxHeight': '200px'}}/>
        <CardBody>
          <CardTitle>{article.title}</CardTitle>
          <p>{article.description}</p>
          <Button theme='secondary'><a target="_blank" rel="noopener noreferrer" href={article.url}>Read More</a></Button>
        </CardBody>
        <CardFooter>Favorite</CardFooter>
      </Card>

  );
}

}