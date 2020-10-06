import React, { Component } from "react";
import {
  Alert,
  Button,
  Container,
  Form,
  FormInput,
  FormGroup,
} from "shards-react";
import { Link } from "react-router-dom";
import { signup } from "../../services/auth";
import Webcam from './Webcam';


export default class Signup extends Component {
  state = {
    username: "",
    password: "",
    message: "",
    profileImg: "",
    showWebcam: false,
  };

  toggleWebcam = () => {
    this.setState((state) => ({ showWebcam: !state.showWebcam }));
  };

  setUserImage = (img) => {
    this.setState({ profileImg: img });
  };

  handleChange = (event) => {
    let name = event.target.id;
    let value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, password } = this.state;

    signup(username, password).then((data) => {
      if (data.message) {
        this.setState({
          username: "",
          password: "",
          message: data.message,
        });
      } else {
        console.log({ data });
        this.props.setUser(data);
        this.props.history.push("/settings/lang");
      }
    });
  };

  render() {
    return (
      <Container>
        <h2>Sign Up</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <label htmlFor="username">Username</label>
            <FormInput
              type="text"
              id="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Password</label>
            <FormInput
              type="password"
              id="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </FormGroup>
          {this.state.message && (
            <Alert theme="warning">{this.state.message}</Alert>
          )}
            <Webcam setUserImage={this.setUserImage}/>
          <Button type="submit">Sign Up</Button>
        </Form>
        <Button theme="primary">
          <Link to="/login">Already have an account? Log In</Link>
        </Button>

       
      </Container>
    );
  }
}
