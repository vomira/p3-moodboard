import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle
} from "shards-react";

export default function JokeCard(props) {
  return (
    <Card className='my-2'>
      <CardHeader>Random Joke</CardHeader>
      <CardBody>
      <CardTitle>{props.joke.setup}</CardTitle>
      <p>{props.joke.punchline}</p>
      </CardBody>
    </Card>
  );
}