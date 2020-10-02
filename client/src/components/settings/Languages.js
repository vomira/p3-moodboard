import React, { Component } from "react";
import { Button, Col, Container, FormCheckbox, Row } from "shards-react";
import { Link } from 'react-router-dom';

export default class Languages extends Component {
  state = {
    langEN: true,
    langDE: true,
  };

  handleChange(e, name) {
    const newState = !this.state[name];
    this.setState({ [name]: newState });
  }

  render() {
    return (
      <Container style={{'height': '100vh'}}>
      <Row>
      <Col sm="12" lg="4">
        <h4>Select languages</h4>
        
        <FormCheckbox
          inline
          checked={this.state.langEN}
          onChange={(e) => this.handleChange(e, "langEN")}
        >
          German
        </FormCheckbox>
        <FormCheckbox
          inline
          checked={this.state.langDE}
          onChange={(e) => this.handleChange(e, "langDE")}
        >
          English
        </FormCheckbox>
        </Col>
        </Row>
        <Row>
        <Button theme="secondary"><Link to='/settings/news'>Next</Link></Button>
        </Row>
      </Container>
    );
  }
}
