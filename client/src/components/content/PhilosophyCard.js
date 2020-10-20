import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle
} from "shards-react";

const PhilosophyCard = ({quote}) => {
  return (
    <Card className='my-2'>
      <CardHeader>Philosophy Quote</CardHeader>
      <CardBody>
      <CardTitle>{quote.quote}</CardTitle>
      <p>{quote.source}</p>
      </CardBody>
    </Card>
  );
}

export default PhilosophyCard;