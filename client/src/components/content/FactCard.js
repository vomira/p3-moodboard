import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "shards-react";

export default function BasicCardExample(props) {
  return (
    <Card>
      <CardHeader>Random Fact</CardHeader>
      <CardBody>
        <p>{props.fact.text}</p>
      </CardBody>
      <CardFooter>Source: {props.fact.source}
      <p><small>{props.fact.source_url}</small></p></CardFooter>
    </Card>
  );
}