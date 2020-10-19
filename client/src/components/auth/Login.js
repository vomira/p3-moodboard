import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
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
import { login, loginFID } from "../../services/auth";
import WebCam from "react-webcam";

const Login = ({ setUser }) => {
  const history = useHistory();
  const webcamRef = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showWebcam, setShowWebcam] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!showWebcam) {
      login(username, password)
        .then((data) => {
          if (data.message) {
            setUsername("");
            setPassword("");
            setMessage(data.message);
          } else {
            setUser(data);
            history.push("/moodcheck");
          }
        })
        .catch((err) => console.log(err));
    } else {
      const loginImg = webcamRef.current.getScreenshot();
      loginFID(username, loginImg).then((data) => {
        if (data.message) {
          setUsername("");
          setPassword("");
          setMessage(data.message);
        } else {
          console.log({ data });
          setUser(data.user);
          localStorage.setItem("mood", data.mood);
          history.push("/moodboard");
        }
      });
    }
  };

  return (
    <Container>
      <Row>
        <Col sm="12" lg="12" className="d-flex flex-column align-items-center">
          <h4 className="m-4">Log In</h4>
          <Form
            className="auth-form d-flex flex-column align-items-center"
            onSubmit={() => handleSubmit}
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
                  mirrored="true"
                  className="webcam"
                />
              </Container>
            </Collapse>
            {message && <Alert theme="warning">{message}</Alert>}
            <Container className="d-flex flex-row justify-content-center">
              <Button className="m-2" type="submit">
                Log In
              </Button>
              <Button
                className="m-2"
                onClick={() => setShowWebcam(!showWebcam)}
              >
                {showWebcam ? "Log In with Password" : "Log In with Face ID"}
              </Button>
            </Container>
          </Form>
          <Button className="m-2" theme="info">
            <Link to="/signup">Don't have an account yet? Sign Up!</Link>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
