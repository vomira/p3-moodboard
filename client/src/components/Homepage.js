import React, { Component } from "react";
import { Button, Container } from "shards-react";
import Login from "./auth/Login";
import { Link } from 'react-router-dom';
import Logo from '../resources/logo_trans_cropped.png';

export default class Homepage extends Component {
  render() {
    return (
      <Container className='hp-c d-flex flex-column align-items-center justify-content-start' >
        <Container className='logo-c m-4 d-flex flex-column justify-content-start align-items-center'>
        <img src={Logo} className='hp-logo'/>
        <h5>You don't have to tell us how you feel. We already know.</h5>
        </Container>
        {!this.props.user ? 
        <Container className='d-flex flex-row justify-content-center'>
        <Button className='m-4' ><Link to='/login'>Log In</Link></Button>
        <Button className='m-4' ><Link to='/signup'>Sign Up</Link></Button>
        </Container>
        :
        <Container className='d-flex flex-row justify-content-center'>
        <Button className='m-4'><Link to='/moodboard'>Go to your feed</Link></Button>
  
        </Container>
        }
        
      </Container>
    );
  }
}
