import React, { Component } from "react";
import { Button, Container, Form, FormCheckbox, Row } from "shards-react";

export default class MoodCheck extends Component {
  state = {
    selectedMoods: []
  };


  handleChange = (event, score) => {
    let name = event.target.id;
    let selected = this.state.selectedMoods.some(el => el.name === name);
    if(!selected) {
      this.setState((state) => ({ selectedMoods: [...state.selectedMoods, {name, score}]}))
    }
    if(selected) {
      this.setState((state) => ({ selectedMoods: [...state.selectedMoods.filter(el => el.name !== name)]}))
    }
  }


  handleSubmit = (event) => {
    event.preventDefault();
    let moodScore = 0;
    this.state.selectedMoods.forEach(mood => moodScore += mood.score);
    if(moodScore < 0) {
      this.props.setMood('bad');
      window.localStorage.setItem('mood', 'bad');
    } else {
      this.props.setMood('good');
      window.localStorage.setItem('mood', 'good');
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
              checked={this.state.selectedMoods.some((el => el.name === mood.name))}
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
