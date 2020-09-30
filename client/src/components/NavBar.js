import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'shards-react'

export default class NavBar extends Component {
  render() {
    return (
      <Navbar type="dark" theme="info" expand="md">
      <NavbarBrand>Moodboard 🙂 🙃 </NavbarBrand>
      </Navbar>
    )
  }
}
