import React, { Component } from "react";
import { Button, Container, Form, FormCheckbox, Row } from "shards-react";
import axios from 'axios'

export default class Goodies extends Component {
  state = {
    goodies: [],
  };


  handleChange = (event) => {
    let name = event.target.id;
    let selected = this.state.goodies.includes(name);
    if(!selected) {
      this.setState((state) => ({ goodies: [...state.goodies, name]}))
    }
    if(selected) {
      this.setState((state) => ({ goodies: [...state.goodies.filter(el => el !== name)]}))
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.put('/user/update', {
      user: this.props.user,
      goodies: this.state.goodies
    })
    .then(() => {
      this.setState({goodies: []});
      this.props.history.push('/moodcheck');
    })
    .catch(err => console.log(err))
  }

  render() {
    const goodies = [
      { name: "Cute Animal Pictures", id: 1 },
      { name: "Meditation", id: 2 },
      { name: "Science Stuff", id: 3 },
      { name: "Poetry", id: 4 },
      { name: "Arts", id: 5 },
      { name: "Memes", id: 6 },
      { name: "Music", id: 7 },
      { name: "Food", id: 8 },
    ];

    return (
      <Container>
      <Form onSubmit={this.handleSubmit}>
        <h4>What cheers you up if you are down?</h4>
        {goodies.map((goodie) => {
          return (
            <FormCheckbox inline
              id={goodie.name}
              key={goodie.id}
              checked={this.state.goodies.includes(goodie.name)}
              onChange={(e) => this.handleChange(e, goodie.name)}
              className="m-2"
            >
              {goodie.name}
            </FormCheckbox>
          );
        })}

        <Row>
        <Button type='submit' theme="secondary">
        Next
        </Button>
        </Row>
        </Form>
      </Container>
    );
  }
}
