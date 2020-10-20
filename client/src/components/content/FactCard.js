import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "shards-react";

const FactCard = ({fact}) => {
  return (
    <Card className='my-2'>
      <CardHeader>Random Fact</CardHeader>
      <CardBody>
        <p>{fact.text}</p>
      </CardBody>
    </Card>
  );
}

export default FactCard;