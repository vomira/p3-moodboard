import React from "react";
import {
  Card,
  CardHeader,
  CardBody,

} from "shards-react";

const Advice = ({slip}) => {
  return (
    <Card className='my-2'>
      <CardHeader>Advice</CardHeader>
      <CardBody>
        <p>{slip.advice}</p>
      </CardBody>
    </Card>
  );
}

export default Advice