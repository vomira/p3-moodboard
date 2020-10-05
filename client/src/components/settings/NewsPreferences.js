import React, { Component } from "react";
import axios from "axios";
import { Button, Col, Container, Form, FormCheckbox, Row } from "shards-react";

export default class NewsPreferences extends Component {
  state = {
    newsSources: [],
    selectedNewsSources: [],
  };

  componentDidMount = () => {
    let promises = [];
    let gbSources = axios.get("/data/newssources/en/gb");
    let usSources = axios.get("/data/newssources/en/us");
    let deSources = axios.get("/data/newssources/de/de");
    if (this.props.user.languages.includes("EN")) {
      promises.push(usSources, gbSources);
    }
    if (this.props.user.languages.includes("DE")) {
      promises.push(deSources);
    }
    Promise.all(promises)
      .then((sources) => {
        let allSources = sources
          .map((source) => source.data)
          .reduce((a, b) => a.concat(b), []);
        console.log(allSources);
        this.setState({
          newsSources: allSources,
        });
      })
      .catch((err) => console.log(err));
  };

  handleChange = (event) => {
    let name = event.target.id;
    let selected = this.state.selectedNewsSources.includes(name);
    if (!selected) {
      this.setState((state) => ({
        selectedNewsSources: [...state.selectedNewsSources, name],
      }));
    }
    if (selected) {
      this.setState((state) => ({
        selectedNewsSources: [
          ...state.selectedNewsSources.filter((el) => el !== name),
        ],
      }));
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("/user/update", {
        user: this.props.user,
        newsPreferences: this.state.selectedNewsSources,
      })
      .then(() => {
        this.setState({ selectedNewsSources: [] });
        this.props.history.push("/settings/goodies");
      })
      .catch((err) => console.log(err));
  };
  

  render() {
    let newsCategories = [
      "general",
      "technology",
      "entertainment",
      "science",
      "sports",
      "business",
    ];

    let newsContainer = newsCategories.map((category) => {
      return (
        <Container>
          <Row>
            <h6>{category}</h6>
          </Row>
          <Row>
            {this.state.newsSources
              .filter((source) => source.category === category)
              .map((newsSource) => {
                return (
                  <FormCheckbox
                    id={newsSource.id}
                    key={newsSource.id}
                    checked={this.state.selectedNewsSources.includes(
                      newsSource.id
                    )}
                    onChange={this.handleChange}
                    className="m-2"
                  >
                    {newsSource.name}
                  </FormCheckbox>
                );
              })}
          </Row>
        </Container>
      );
    });

  if(this.state.newsSources.length === 0) return (<></>)
  return (
          <Container>
          <Container className='p3 m5'>
          <Form onSubmit={this.handleSubmit}>
          <h4>Which news sources are you interested in?</h4>
         {newsContainer}
         <Row>
        <Button type="submit" theme="secondary">Next</Button>
         </Row>
         </Form>
       </Container>
       </Container>
  )
  
  }
}
