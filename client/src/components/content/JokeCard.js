import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle
} from "shards-react";

export default function JokeCard(props) {
  return (
    <Card>
      <CardHeader>Random Joke</CardHeader>
      <CardBody>
      <CardTitle>{props.joke.setup}</CardTitle>
      <p>{props.joke.punchline}</p>
      </CardBody>
    </Card>
  );
}