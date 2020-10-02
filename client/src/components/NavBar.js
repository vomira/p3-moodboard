import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavLink, NavItem } from 'shards-react';
import { logout } from '../services/auth';

const handleLogout = props => {
  logout()
  .then(() => {
    props.setUser(null);
  })
}

export default function NavBar(props) {
    return (
      <Navbar type="dark" theme="info" expand="md">
      <NavbarBrand>Moodboard 🙂 🙃 </NavbarBrand>
     
     
      {props.user ? 
        <Nav>
        <NavItem>
          <NavLink href='/' onClick={() => handleLogout(props)}>Log Out</NavLink>
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
