import React, { Component } from "react";
import { Button, Container } from "shards-react";
import Login from "./auth/LoginPW";
import { Link } from 'react-router-dom'

export default class Homepage extends Component {
  render() {
    return (
      <Container>
        <h1>Welcome to moodboard 🙂🙃</h1>
        {typeof this.props.user !== 'undefined' ? 
        <Container>
        <Button theme="primary"><Link to='/login'>Log In</Link></Button>
        <Button theme="primary"><Link to='/signup'>Sign Up</Link></Button>
        </Container>
        :
        <Container>
        <Button theme="primary"><Link to='/moodboard'>Go to your feed</Link></Button>
  
        </Container>
        }
        
      </Container>
    );
  }
}
