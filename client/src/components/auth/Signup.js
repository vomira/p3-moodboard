import React, { useState, useRef } from "react";
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

const Signup = (props) => {
  const webcamRef = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showWebcam, setShowWebcam] = useState(true);
  


const handleSubmit = (event) => {

    event.preventDefault();
    if (!showWebcam) {
      signup(username, password).then((data) => {
        if (data.message) {
          setUsername("");
          setPassword("");
          setMessage(data.message);
        } else {
          console.log({ data });
          props.setUser(data);
          props.history.push("/moodcheck");
        }
      });
    } else {
      const profileImg = webcamRef.current.getScreenshot();
      signupFID(username, profileImg).then((data) => {
        if (data.message) {
          setUsername("");
          setPassword("");
          setMessage(data.message);
        } else {
          console.log({ data });
          props.setUser(data);
          localStorage.setItem("mood", data.mood);
          props.history.push("/settings/news");
        }
      });
    }
  };

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
              onSubmit={handleSubmit}
            >
              <FormGroup>
                <FormInput
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </FormGroup>

              <Collapse open={!showWebcam}>
                <FormGroup>
                  <FormInput
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </FormGroup>
              </Collapse>
              <Collapse open={showWebcam}>
                <Container>
                  <WebCam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/png"
                    mirrored='true'
                    className="webcam"
                  />
                </Container>
              </Collapse>
              {message && (
                  <Alert theme="warning">{message}</Alert>
                )}
              <Container className="d-flex flex-row justify-content-center">
                <Button className="m-2" type="submit">
                  Sign Up
                </Button>
                <Button className="m-2" onClick={() => setShowWebcam(!showWebcam)}>
                  {showWebcam
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

export default Signup;