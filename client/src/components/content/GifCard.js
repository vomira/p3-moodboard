import React from "react";
import {
  Card,
  CardHeader,
  CardImg,
  CardFooter
} from "shards-react";

const GifCard = ({gif}) => {
  
  return (
    <Card className='my-2'>
      <CardHeader>GIPHY</CardHeader>
      <CardImg src={gif.url} />
    </Card>
  );
}

export default GifCard;