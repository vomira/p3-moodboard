import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle
} from "shards-react";

export default function PhilosophyCard(props) {
  return (
    <Card className='my-2'>
      <CardHeader>Philosophy Quote</CardHeader>
      <CardBody>
      <CardTitle>{props.quote.quote}</CardTitle>
      <p>{props.quote.source}</p>
      </CardBody>
    </Card>
  );
}