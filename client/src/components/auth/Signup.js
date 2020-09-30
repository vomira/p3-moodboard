import React, { Component } from "react";
import { Button, Form, FormInput, FormGroup } from "shards-react";
import { Link } from 'react-router-dom';

export default class Signup extends Component {
  render() {
    return (
      <>
        <h2>Sign Up</h2>
        <Form>
      <FormGroup>
        <label htmlFor="#username">Username</label>
        <FormInput id="#username" placeholder="Username" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="#password">Password</label>
        <FormInput type="password" id="#password" placeholder="Password" />
      </FormGroup>
      <Button type='submit'>Sign Up</Button>
    </Form>
        <Link to='/'>Already have an account? Log in!</Link>
      </>
    );
  }
}
