import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavLink, NavItem } from 'shards-react';
import { logout } from '../services/auth';
import Logo from '../resources/logo_trans_cropped.png';
import { Link } from 'react-router-dom';

const handleLogout = props => {
  logout()
  .then(() => {
    props.setUser(null);
    props.history.push('/');
  })
}

export default function NavBar(props) {
    return (
      <Navbar className='primary d-flex' expand="sm">
      <img src={Logo} className='nav-logo'/>
      
    
     
      {props.user ? 
        <Nav>
        <NavItem>
          <NavLink onClick={() => handleLogout(props)}>Log Out</NavLink>
        </NavItem>
        </Nav> :
        <Nav>
        <NavItem>
          <NavLink href='/login'>Log In</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href='/signup'>Sign Up</NavLink>
        </NavItem>
        </Nav>
        }
       
      

      </Navbar>
    )
}
