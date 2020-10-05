
import React, { Component } from 'react';
import axios from 'axios';
import { Button, Col, Container, Form, FormCheckbox, Row } from "shards-react";



export default class NewsPreferences extends Component {

  state = {
    newsSources: [],
    selectedNewsSources: []
  }

  componentDidMount = () => {
    let gbSources = axios.get('/data/newssources/en/gb');
    let usSources = axios.get('/data/newssources/en/us');
    let deSources = axios.get('/data/newssources/de/de');
    Promise.all([gbSources, usSources, deSources])
    .then(sources => {
      let allSources = sources.map(source => source.data).reduce((a, b) => a.concat(b), []);
      console.log(allSources);
      this.setState({
        newsSources: allSources
      })
    })
    .catch(err => console.log(err))
  }

  handleChange = (event) => {
    let name = event.target.id;
    let selected = this.state.selectedNewsSources.includes(name);
    if(!selected) {
      this.setState((state) => ({ selectedNewsSources: [...state.selectedNewsSources, name]}))
    }
    if(selected) {
      this.setState((state) => ({ selectedNewsSources: [...state.selectedNewsSources.filter(el => el !== name)]}))
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.put('/user/update', {
      user: this.props.user,
      newsPreferences: this.state.selectedNewsSources
    })
    .then(() => {
      this.setState({selectedNewsSources: []});
      this.props.history.push('/settings/goodies');
    })
    .catch(err => console.log(err))
  }

  render() {

  //   let newsCategories = ['general', 'technology', 'entertainment', 'science', 'sports', 'business'];

  //   let newsCheckboxes = newsCategories.map(category => {
  //       console.log(category);
  //       this.state.newsSources.filter(source => source.category === category).map(newsSource => {
  //         return(
  //     <Container>
  //     <Row>
  //     <h6>{category}</h6>
  //     </Row>
  //     <Row>

  //     <FormCheckbox
  //         key={newsSource.id}
  //         checked={this.state.selectedNewsSources.get(newsSource.name)}
  //         onChange={this.handleChange}
  //         className='m-2'
  //       >
  //         {newsSource.name}
  //       </FormCheckbox>
  //       </Row>
  //       </Container>
  //       )
  // })})
    
    if(this.state.newsSources.length === 0) return <></>
    return (
      <Container>
      <Container className='p3 m5'>
      <Form onSubmit={this.handleSubmit}>
      <h4>Which news sources are you interested in?</h4>
  
      <Row>
      <h6>General</h6>
      </Row>
      <Row>
      {this.state.newsSources.filter(source => source.category === 'general').map(newsSource => {
    return (

      <FormCheckbox
          id={newsSource.name}
          key={newsSource.id}
          checked={this.state.selectedNewsSources.includes(newsSource.name)}
          onChange={this.handleChange}
          className='m-2'
        >
          {newsSource.name}
        </FormCheckbox>
    )
  })}
      </Row>

      <Row>
      <h6>Technology</h6>
      </Row>
      <Row>
      {this.state.newsSources.filter(source => source.category === 'technology').map(newsSource => {
    return (

      <FormCheckbox
          id={newsSource.name}
          key={newsSource.id}
          checked={this.state.selectedNewsSources.includes(newsSource.name)}
          onChange={this.handleChange}
          className='m-2'
        >
          {newsSource.name}
        </FormCheckbox>
    )
  })}
      </Row>
      <Row>
      <h6>Science</h6>
      </Row>
      <Row>
      {this.state.newsSources.filter(source => source.category === 'science').map(newsSource => {
    return (

      <FormCheckbox
          id={newsSource.name}
          key={newsSource.id}
          checked={this.state.selectedNewsSources.includes(newsSource.name)}
          onChange={this.handleChange}
          className='m-2'
        >
          {newsSource.name}
        </FormCheckbox>
    )
  })}
      </Row>
      <Row>
      <h6>Sports</h6>
      </Row>
      <Row>
      {this.state.newsSources.filter(source => source.category === 'sports').map(newsSource => {
    return (

      <FormCheckbox
          id={newsSource.name}
          key={newsSource.id}
          checked={this.state.selectedNewsSources.includes(newsSource.name)}
          onChange={this.handleChange}
          className='m-2'
        >
          {newsSource.name}
        </FormCheckbox>
    )
  })}
      </Row>
      <Row>
      <h6>Business</h6>
      </Row>
      <Row>
      {this.state.newsSources.filter(source => source.category === 'business').map(newsSource => {
    return (

      <FormCheckbox
          id={newsSource.name}
          key={newsSource.id}
          checked={this.state.selectedNewsSources.includes(newsSource.name)}
          onChange={this.handleChange}
          className='m-2'
        >
          {newsSource.name}
        </FormCheckbox>
    )
  })}
      </Row>
      <Row>
      <h6>Entertainment</h6>
      </Row>
      <Row>
      {this.state.newsSources.filter(source => source.category === 'entertainment').map(newsSource => {
    return (

      <FormCheckbox
          id={newsSource.name}
          key={newsSource.id}
          checked={this.state.selectedNewsSources.includes(newsSource.name)}
          onChange={this.handleChange}
          className='m-2'
        >
          {newsSource.name}
        </FormCheckbox>
    )
  })}
      </Row>
      <Row>
        <Button type="submit" theme="secondary">Next</Button>
        </Row>
        </Form>
      </Container>
      </Container>
    )
  }
}
