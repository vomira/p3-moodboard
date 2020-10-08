import React, { Component } from "react";
import axios from "axios";
import { Button, Col, Collapse, Container, Form, FormCheckbox, Row } from "shards-react";

export default class NewsPreferences extends Component {
  state = {
    newsSources: [],
    selectedNewsSources: [],
    showCategories: {
      general: false,
      technology: false,
      entertainment: false,
      science: false,
      sports: false,
      business: false,
    }
  };

  componentDidMount = () => {
    let gbSources = axios.get("/data/newssources/en/gb");
    let usSources = axios.get("/data/newssources/en/us");
    let deSources = axios.get("/data/newssources/de/de");

    Promise.all([gbSources, usSources, deSources])
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

  toggleCollapse = (event) => {
    event.preventDefault();
    let name = event.target.id;
    this.setState(prevState => ({
      showCategories: {                   // object that we want to update
          ...prevState.showCategories,    // keep all other key-value pairs
          [name]: !prevState.showCategories[name]       // update the value of specific key
      }
  }))
 }
    

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
    console.log(this.props.user);
    axios
      .put("/user/update", {
        user: this.props.user.user,
        selectedNewsSources: this.state.selectedNewsSources,
      })
      .then((user) => {
        console.log(user);
        this.setState({ selectedNewsSources: [] });
        this.props.history.push("/moodboard");
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
          <Col
          sm="8"
          lg="12"
          className='d-flex justify-content-center align-items-center flex-wrap'>
          <Button className='m-2' block id={category} onClick={this.toggleCollapse} theme='light'>{category}</Button>
            {/* <a href="#"><h6 id={category} onClick={this.toggleCollapse}>{category} ▼</h6></a> */}
          <Collapse open={this.state.showCategories[category]}>
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
                    inline
                  >
                    {newsSource.name}
                  </FormCheckbox>
                );
              })}
 
          </Collapse>
          </Col>
          </Row>
        </Container>
      );
    });

  if(this.state.newsSources.length === 0) return (<></>)
  return (
          <Container>
          <Row>
          <Col
           sm="8"
          lg="12"
          className='my-4 d-flex flex-column justify-content-center align-items-center'
          >
          <Form className='news-form' onSubmit={this.handleSubmit}>
          <h4>Which news sources are you interested in?</h4>
         {newsContainer}
         <Container className='d-flex justify-content-end'>
        <Button className='m-4' type="submit" theme="primary">Next</Button>
         </Container>
         </Form>
       </Col>
       </Row>
       </Container>
  )
  
  }
}
