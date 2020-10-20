import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Col, Collapse, Container, Form, FormCheckbox, Row } from "shards-react";

const NewsPreferences = (props) => {
  const [newsSources, setNewsSources] = useState([]);
  const [selectedNewsSources, setSelectedNewsSources] = useState([]);
  const [showCategories, setShowCategories] = useState({
    general: false,
    technology: false,
    entertainment: false,
    science: false,
    sports: false,
    business: false,
  });

  useEffect(() => {
    let gbSources = axios.get("/data/newssources/en/gb");
    let usSources = axios.get("/data/newssources/en/us");
    let deSources = axios.get("/data/newssources/de/de");

    Promise.all([gbSources, usSources, deSources])
      .then((sources) => {
        let allSources = sources
          .map((source) => source.data)
          .reduce((a, b) => a.concat(b), []);
        console.log(allSources);
        setNewsSources(allSources);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (event) => {
    selectedNewsSources.includes(event.target.id) ?  setSelectedNewsSources([...selectedNewsSources.filter((el) => el !== event.target.id)]) : setSelectedNewsSources([...selectedNewsSources, event.target.id])
  };

  const handleSubmit = (event) => {
    console.log(props.user);
    event.preventDefault();
    axios
      .put("/user/update", {
        user: props.user,
        selectedNewsSources: selectedNewsSources,
      })
      .then((user) => {
        setSelectedNewsSources([]);
        props.history.push("/moodboard");
      })
      .catch((err) => console.log(err));
  };
  

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
          <Button className='m-2' block id={category} onClick={(e) => setShowCategories({...showCategories, [category]: !showCategories[category]})} theme='light'>{category}</Button>
            {/* <a href="#"><h6 id={category} onClick={this.toggleCollapse}>{category} ▼</h6></a> */}
          <Collapse open={showCategories[category]}>
            {newsSources
              .filter((source) => source.category === category)
              .map((newsSource) => {
                return (
                  <FormCheckbox
                    id={newsSource.id}
                    key={newsSource.id}
                    checked={selectedNewsSources.includes(
                      newsSource.id
                    )}
                    onChange={handleChange}
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

  if(newsSources.length === 0) return (<></>)
  return (
          <Container>
          <Row>
          <Col
           sm="8"
          lg="12"
          className='my-4 d-flex flex-column justify-content-center align-items-center'
          >
          <Form className='news-form' onSubmit={handleSubmit}>
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

export default NewsPreferences;