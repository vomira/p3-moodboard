import React, { Component } from "react";
import { Button, Container, FormCheckbox, Row } from "shards-react";
import { Link } from 'react-router-dom';

export default class Goodies extends Component {
  state = {
    goodies: new Map(),
  };


  handleChange(e, name) {
    let isChecked;
    let currentValue = this.state.goodies.get(name)
    if(currentValue === undefined) {
      isChecked = true
    } else {
      isChecked = !currentValue
    }
    this.setState(prevState => ({ goodies: prevState.goodies.set(name, isChecked) }));
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
        <h4>What cheers you up if you are down?</h4>
        {goodies.map((goodie) => {
          return (
            <FormCheckbox inline
              key={goodie.id}
              checked={this.state.goodies.get(goodie.name)}
              onChange={(e) => this.handleChange(e, goodie.name)}
              className="m-2"
            >
              {goodie.name}
            </FormCheckbox>
          );
        })}

        <Row>
        <Button theme="secondary"><Link to='/moodboard'>Next</Link></Button>
        </Row>
      </Container>
    );
  }
}
