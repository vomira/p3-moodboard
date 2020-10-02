import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormInput, FormGroup } from "shards-react";
import { login } from '../../services/auth';

export default class Login extends Component {

  state = {
    username: '',
    password: '',
    message: ''
  }

  handleChange = (event) => {
    let name = event.target.id;
    let value = event.target.value;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, password } = this.state;

    login(username, password)
    .then(data => {
      if(data.message) {
        this.setState({
          user: '',
          password: '',
          message: data.message
        })
      } else {
        this.props.setUser(data);
        this.props.history.push('/moodcheck')
      }
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <Container>
        <h2>Log In</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <label htmlFor="username">Username</label>
            <FormInput
            name="username"
            id="username" 
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
             />
          </FormGroup>
          <FormGroup>
            <label htmlFor="#password">Password</label>
            <FormInput 
            type="password" 
            id="password" 
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange} />
          </FormGroup>
          {this.state.message && (
            <Alert theme='warning'>{this.state.message}</Alert>
          )}
          <Button type='submit'>Log In</Button>
        </Form>
        <Button theme="primary">
        <Link to="/signup">Don't have an account yet? Sign Up!</Link></Button>
      </Container>
    );
  }
}
