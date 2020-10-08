import React from "react";
import {
  Card,
  CardHeader,
  CardImg,
  CardFooter
} from "shards-react";

export default function GifCard(props) {
  
  return (
    <Card className='my-2'>
      <CardHeader>GIPHY</CardHeader>
      <CardImg src={props.gif.url} />
      {/* <CardFooter><a target="_blank" className='card-link' href={props.gif.url}>Source: GIPHY</a></CardFooter> */}
    </Card>
  );
}