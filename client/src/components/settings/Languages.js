import React, { Component } from "react";
import { Button, Col, Container, Form, FormCheckbox, Row } from "shards-react";
import axios from 'axios';


export default class Languages extends Component {
  state = {
    languages: []
  };

  handleChange = (event) => {
    let name = event.target.id;
    let selected = this.state.languages.includes(name);
    if(!selected) {
      this.setState((state) => ({ languages: [...state.languages, name]}))
    }
    if(selected) {
      this.setState((state) => ({ languages: [...state.languages.filter(el => el !== name)]}))
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.put('/user/update', {
      user: this.props.user,
      languages: this.state.languages
    })
    .then(() => {
      console.log('success!')
      this.props.history.push('/settings/news');
      this.setState({languages: []});
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <Container style={{'height': '100vh'}}>
      <Form onSubmit={this.handleSubmit}>
      <Row>
      <Col sm="12" lg="12">
        <h4>Select languages in which you prefer your content</h4>
        <FormCheckbox
          inline
          id='EN'
          checked={this.state.languages.includes('EN')}
          onChange={this.handleChange}
        >
          English
        </FormCheckbox>
        <FormCheckbox
          inline
          id='DE'
          checked={this.state.languages.includes('DE')}
          onChange={this.handleChange}
        >
          German
        </FormCheckbox>
        </Col>
        </Row>
        <Row>
        <Button type='submit' theme="secondary">Next</Button>
        </Row>
        </Form>
      </Container>
    );
  }
}
