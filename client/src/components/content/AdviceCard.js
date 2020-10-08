import React from "react";
import {
  Card,
  CardHeader,
  CardBody,

} from "shards-react";

export default function Advice(props) {
  return (
    <Card className='my-2'>
      <CardHeader>Advice</CardHeader>
      <CardBody>
        <p>{props.slip.advice}</p>
      </CardBody>
    </Card>
  );
}