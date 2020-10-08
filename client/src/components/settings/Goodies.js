import React, { Component } from "react";
import { Button, Col, Container, Form, FormCheckbox, Row } from "shards-react";
import axios from "axios";
import { Link } from 'react-router-dom'

export default class Goodies extends Component {
  state = {
    goodies: [],
  };

  handleChange = (event) => {
    let name = event.target.id;
    let selected = this.state.goodies.includes(name);
    if (!selected) {
      this.setState((state) => ({ goodies: [...state.goodies, name] }));
    }
    if (selected) {
      this.setState((state) => ({
        goodies: [...state.goodies.filter((el) => el !== name)],
      }));
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("/user/update", {
        user: this.props.user,
        goodies: this.state.goodies,
      })
      .then(() => {
        this.setState({ goodies: [] });
        this.props.history.push("/moodboard");
      })
      .catch((err) => console.log(err));
  };

  render() {
    const goodies = [
      { name: "Cute Animal Gifs", id: 1 },
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
        <Row>
          <Col
            sm="8"
            lg="12"
            className="my-4 d-flex flex-column justify-content-center align-items-center"
          >
            <Form className='w-75' onSubmit={this.handleSubmit}>
            <Container className='mx-6'>
              <h4 >What cheers you up if you are down?</h4>
              </Container>
              <Container className='d-flex my-4 mx-6'>
              <Row>
           
              {goodies.map((goodie) => {
                return (
                  <Col sm='6'
              lg='3'>
                  <FormCheckbox className='px-6'
                    id={goodie.name}
                    key={goodie.id}
                    checked={this.state.goodies.includes(goodie.name)}
                    onChange={(e) => this.handleChange(e, goodie.name)}
                    className="m-2"
                  >
                    {goodie.name}
                  </FormCheckbox>
                  </Col>
                );
              })}
              
              </Row>
              </Container>
              <Container className='d-flex justify-content-between'>
              <Button className='m-4' theme="primary"><Link to='/settings/news'>Back</Link></Button>
              <Button className='m-4' type="submit" theme="primary">Next</Button>
              </Container>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
