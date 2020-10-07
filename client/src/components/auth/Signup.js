import React, { Component } from "react";
import {
  Alert,
  Button,
  Collapse,
  Container,
  Form,
  FormInput,
  FormGroup,
} from "shards-react";
import { Link } from "react-router-dom";
import { signup } from "../../services/auth";
import { signupFID } from '../../services/auth';
import Webcam from "./Webcam";

export default class Signup extends Component {
  state = {
    username: "",
    password: "",
    message: "",
    profileImg: "",
    showWebcam: true,
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

    const { username, password, profileImg } = this.state;
    if(!this.state.showWebcam) {
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
      })
    } else {
      signupFID(username, profileImg)
      .then((data) => {
        if (data.message) {
          this.setState({
            username: "",
            profileImg: "",
            message: data.message,
          });
        } else {
          console.log({ data });
          this.props.setUser(data);
          localStorage.setItem('mood', data.mood);
          this.props.history.push("/settings/lang");
        }
      })}}

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

          <Collapse open={!this.state.showWebcam}>
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
          </Collapse>
          <Collapse open={this.state.showWebcam}>
            <Webcam setUserImage={this.setUserImage} />
          </Collapse>
          <Button onClick={this.toggleWebcam}>
            {this.state.showWebcam
              ? "Sign Up with Password"
              : "Sign Up with Face ID"}
          </Button>
          {this.state.message && (
            <Alert theme="warning">{this.state.message}</Alert>
          )}

          <Button type="submit">Sign Up</Button>
        </Form>
        <Button theme="primary">
          <Link to="/login">Already have an account? Log In</Link>
        </Button>
      </Container>
    );
  }
}
