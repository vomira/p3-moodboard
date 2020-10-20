import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle
} from "shards-react";

const JokeCard = ({joke}) => {
  return (
    <Card className='my-2'>
      <CardHeader>Random Joke</CardHeader>
      <CardBody>
      <CardTitle>{joke.setup}</CardTitle>
      <p>{joke.punchline}</p>
      </CardBody>
    </Card>
  );
}

export default JokeCard;