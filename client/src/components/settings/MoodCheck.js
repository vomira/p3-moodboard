import React, { useState } from "react";

import { Button, Col, Container, Form, FormCheckbox, Row } from "shards-react";

const MoodCheck = (props) => {
  const [selectedMoods, setSelectedMoods] = useState([]);

  const handleChange = (event, score) => {
    const name = event.target.id;
    selectedMoods.some((el) => el.name === name)
      ? setSelectedMoods([...selectedMoods.filter((el) => el.name !== name)])
      : setSelectedMoods([...selectedMoods, { name, score }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let moodScore = 0;
    selectedMoods.forEach((mood) => (moodScore += mood.score));
    if (moodScore < 0) {
      props.setMood("bad");
      window.localStorage.setItem("mood", "bad");
    } else {
      props.setMood("good");
      window.localStorage.setItem("mood", "good");
    }

    props.user.newsPreferences.length === 0
      ? props.history.push("/settings/news")
      : props.history.push("/moodboard");
  };

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
    { name: "Optimistic", id: 11, score: 2 },
  ];

  return (
    <Container>
      <Row>
      <Col
           sm="8"
          lg="12"
          className='my-4 d-flex flex-column justify-content-center align-items-start'
          >
          <h4>How are you feeling today?</h4>
          <Form onSubmit={handleSubmit}>
            {moods.map((mood) => {
              return (
                <FormCheckbox
                  inline
                  key={mood.id}
                  id={mood.name}
                  checked={selectedMoods.some((el) => el.name === mood.name)}
                  onChange={(e) => handleChange(e, mood.score)}
                  className="m-2"
                >
                  {mood.name}
                </FormCheckbox>
              );
            })}
            <Row className='d-flex justify-content-end'>
              <Button className='m-4' type="submit" theme="secondary">
                Next
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default MoodCheck;
