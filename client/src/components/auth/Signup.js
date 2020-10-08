import React, { Component } from "react";
import {
  Alert,
  Button,
  Col,
  Collapse,
  Container,
  Form,
  FormInput,
  FormGroup,
  Row,
} from "shards-react";
import { Link } from "react-router-dom";
import { signup } from "../../services/auth";
import { signupFID } from "../../services/auth";
import WebCam from "react-webcam";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.webcamRef = React.createRef();
    this.state = {
      username: "",
    password: "",
    message: "",
    profileImg: "",
    showWebcam: true,
    }
  }


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

    if (!this.state.showWebcam) {
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
          this.props.history.push("/moodcheck");
        }
      });
    } else {
      const profileImg = this.webcamRef.current.getScreenshot();
      const { username } = this.state;
      signupFID(username, profileImg).then((data) => {
        if (data.message) {
          this.setState({
            username: "",
            profileImg: "",
            message: data.message,
          });
        } else {
          console.log({ data });
          this.props.setUser(data);
          localStorage.setItem("mood", data.mood);
          this.props.history.push("/settings/news");
        }
      });
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <Col
            sm="12"
            lg="12"
            className="d-flex flex-column align-items-center"
          >
            <h4 className="m-4">Sign Up</h4>
            <Form
              className="auth-form d-flex flex-column align-items-center"
              onSubmit={this.handleSubmit}
            >
              <FormGroup>
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
                <Container>
                  <WebCam
                    audio={false}
                    ref={this.webcamRef}
                    screenshotFormat="image/png"
                    mirrored='true'
                    className="webcam"
                  />
                </Container>
              </Collapse>
              {this.state.message && (
                  <Alert theme="warning">{this.state.message}</Alert>
                )}
              <Container className="d-flex flex-row justify-content-center">
                <Button className="m-2" type="submit">
                  Sign Up
                </Button>
                <Button className="m-2" onClick={this.toggleWebcam}>
                  {this.state.showWebcam
                    ? "Sign Up with Password"
                    : "Sign Up with Face ID"}
                </Button>
            
              </Container>
            </Form>
            <Button className="m-2" theme='info' >
              <Link to="/login">Already have an account? Log In</Link>
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
