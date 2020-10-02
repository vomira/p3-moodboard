import React, { Component } from "react";
import { Button, Container, Form, FormCheckbox, Row } from "shards-react";

export default class MoodCheck extends Component {
  state = {
    selectedMoods: new Map()
  };

  checkMood = (mood) => {
    const moods = {
      'Calm': 1,
      'Angry': -2,
      'Happy': 2,
      'Frustrated': -2,
      'Fearful': -2,
      'Peaceful': 1,
      'Anxious': -2,
      'Sad': -2,
      'Excited': 2,
      'Depressed': -2,
      'Optimistic': 2
    }
    return moods[mood]
  }

  handleChange = (event) => {
    let name = event.target.id;
    let isChecked;
    let currentValue = this.state.selectedMoods.get(name);
    if(currentValue === undefined) {
      isChecked = true
    } else {
      isChecked = !currentValue
    }
    this.setState(prevState => ({ selectedMoods: prevState.selectedMoods.set(name, isChecked) }));
  }


  handleSubmit = (event) => {
    event.preventDefault();
    let moodScore = 0;
    for (let [mood, isChecked] of  this.state.selectedMoods.entries()) {
      if(isChecked) {
        moodScore += this.checkMood(mood);
      }
    }
    if(moodScore < 0) {
      this.props.setMood('bad')
    } else {
      this.props.setMood('good')
    }
    
    this.props.history.push('/moodboard');
  }

  

  render() {
    const moods = [
      { name: "Calm", id: 1, score: 1 },
      { name: "Angry", id: 2, score: -2 },
      { name: "Happy", id: 3, score: 2 },
      { name: "Frustrated", id: 4, score: -2 },
      { name: "Fearful", id: 5, score: -2 },
      { name: "Peaceful", id: 6, score: 1 },
      { name: "Anxious", id: 7, score: -2 },
      { name: "Sad", id: 8, score: -2 },
      { name: "Excited", id: 9, score: 2 },
      { name: "Depressed", id: 10, score: -2 },
      { name: "Optimistic", id: 11, score: 2 }
    ];

    return (
      <Container>
        <h4>How are you feeling today?</h4>
        <Form onSubmit={this.handleSubmit}>
        {moods.map((mood) => {
          return (
            <FormCheckbox inline
              key={mood.id}
              id={mood.name}
              checked={this.state.selectedMoods.get(mood.name)}
              onChange={(e) => this.handleChange(e, mood.score)}
              className="m-2"
            >
              {mood.name}
            </FormCheckbox>
          );
        })}
        <Row>
        <Button type="submit" theme="secondary">Next</Button>
        </Row>
        </Form>

      </Container>
    );
  }
}
