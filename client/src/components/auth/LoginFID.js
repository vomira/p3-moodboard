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
import { login, loginFID } from "../../services/auth";
import Webcam from "./Webcam";

export default class Signup extends Component {
  state = {
    username: "",
    password: "",
    message: "",
    loginImg: "",
    showWebcam: true,
  };

  toggleWebcam = () => {
    this.setState((state) => ({ showWebcam: !state.showWebcam }));
  };

  setUserImage = (img) => {
    this.setState({ loginImg: img });
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

    const { username, password, loginImg } = this.state;
    if(!this.state.showWebcam) {
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
    } else {
      loginFID(username, loginImg)
      .then((data) => {
        if (data.message) {
          this.setState({
            username: "",
            loginImg: "",
            message: data.message,
          });
        } else {
          console.log({ data });
          this.props.setUser(data);
          this.props.history.push("/settings/lang");
        }
      })}}

  render() {
    return (
      <Container>
        <h2>Log In</h2>
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
              ? "Log In with Password"
              : "Log In with Face ID"}
          </Button>
          {this.state.message && (
            <Alert theme="warning">{this.state.message}</Alert>
          )}

          <Button type="submit">Log In</Button>
        </Form>
        <Button theme="primary">
          <Link to="/login">Don't have an account yet? Sign Up!</Link>
        </Button>
      </Container>
    );
  }
}
