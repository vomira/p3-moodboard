
import React, { Component } from 'react';
import axios from 'axios';
import { Button, Col, Container, FormCheckbox, Row } from "shards-react";
import { Link } from 'react-router-dom';


export default class NewsPreferences extends Component {

  state = {
    newsSources: [],
    selectedNewsSources: new Map()
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

  handleChange(e, name) {
      let isChecked;
      let currentValue = this.state.selectedNewsSources.get(name)
      if(currentValue === undefined) {
        isChecked = true
      } else {
        isChecked = !currentValue
      }
      this.setState(prevState => ({ selectedNewsSources: prevState.selectedNewsSources.set(name, isChecked) }));
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
  //         onChange={e => this.handleChange(e, newsSource.name)}
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
      <h4>Which news sources are you interested in?</h4>
  
      <Row>
      <h6>General</h6>
      </Row>
      <Row>
      {this.state.newsSources.filter(source => source.category === 'general').map(newsSource => {
    return (

      <FormCheckbox
          key={newsSource.id}
          checked={this.state.selectedNewsSources.get(newsSource.name)}
          onChange={e => this.handleChange(e, newsSource.name)}
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
          key={newsSource.id}
          checked={this.state.selectedNewsSources.get(newsSource.name)}
          onChange={e => this.handleChange(e, newsSource.name)}
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
          key={newsSource.id}
          checked={this.state.selectedNewsSources.get(newsSource.name)}
          onChange={e => this.handleChange(e, newsSource.name)}
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
          key={newsSource.id}
          checked={this.state.selectedNewsSources.get(newsSource.name)}
          onChange={e => this.handleChange(e, newsSource.name)}
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
          key={newsSource.id}
          checked={this.state.selectedNewsSources.get(newsSource.name)}
          onChange={e => this.handleChange(e, newsSource.name)}
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
          key={newsSource.id}
          checked={this.state.selectedNewsSources.get(newsSource.name)}
          onChange={e => this.handleChange(e, newsSource.name)}
          className='m-2'
        >
          {newsSource.name}
        </FormCheckbox>
    )
  })}
      </Row>
      <Row>
        <Button theme="secondary"><Link to='/settings/goodies'>Next</Link></Button>
        </Row>
      </Container>
      </Container>
    )
  }
}
