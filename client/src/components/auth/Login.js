import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormInput, FormGroup } from "shards-react";

export default class Login extends Component {
  render() {
    return (
      <>
        <h2>Log In</h2>
        <Form>
          <FormGroup>
            <label htmlFor="#username">Username</label>
            <FormInput id="#username" placeholder="Username" />
          </FormGroup>
          <FormGroup>
            <label htmlFor="#password">Password</label>
            <FormInput type="password" id="#password" placeholder="Password" />
          </FormGroup>
          <Button type='submit'>Log In</Button>
        </Form>
        <Link to="/signup">Don't have an account yet? Sign Up!</Link>
      </>
    );
  }
}
