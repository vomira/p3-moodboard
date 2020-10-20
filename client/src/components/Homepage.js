import React from "react";
import { Button, Container } from "shards-react";
import { Link } from 'react-router-dom';
import Logo from '../resources/logo_trans_cropped.png';

const Homepage = ({user}) => {
    return (
      <Container className='hp-c d-flex flex-column align-items-center justify-content-start' >
        <Container className='logo-c m-4 d-flex flex-column justify-content-start align-items-center'>
        <img src={Logo} className='hp-logo'/>
        <h5>You don't have to tell us how you feel. We already know.</h5>
        </Container>
        {!user ? 
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
};

export default Homepage;