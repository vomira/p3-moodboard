import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "shards-react";

export default function FactCard(props) {
  return (
    <Card className='my-2'>
      <CardHeader>Random Fact</CardHeader>
      <CardBody>
        <p>{props.fact.text}</p>
      </CardBody>
      {/* <CardFooter> <a className='card-link' target="_blank" rel="noopener noreferrer" href={props.fact.source_url}>Source: {props.fact.source}</a> </CardFooter> */}
    </Card>
  );
}