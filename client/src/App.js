import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import { BrowserRouter, Route } from 'react-router-dom';
import Goodies from './components/settings/Goodies';
import Homepage from './components/Homepage';
import Languages from './components/settings/Languages';
import Login from './components/auth/LoginPW';
import MoodCheck from './components/settings/MoodCheck';
import NewsFeed from './components/NewsFeed';
import NavBar from './components/NavBar.js';
import NewsPreferences from './components/settings/NewsPreferences.js';
import Signup from './components/auth/Signup';


class App extends Component {

  state = {
    user: this.props.user,
    mood: ''
  }

  setUser = (data) => {
      this.setState({
        user: data
      })
  }

  setMood = (mood) => {
    this.setState({
      mood: mood
    })
  }

  render() {
    return (
      <BrowserRouter>
        <NavBar user={this.state.user} setState={this.setUser}/>
        <Route 
          exact
          path="/"
          component={Homepage}
        />
        <Route 
          exact
          path="/login"
          render={props => <Login setUser={this.setUser} {...props} />}
        />
        <Route 
          exact
          path="/signup"
          render={props => <Signup setUser={this.setUser} {...props} />}
        />
        <Route
          exact
          path="/settings/lang"
          component={Languages}
        />
        <Route
          exact
          path="/settings/news"
          component={NewsPreferences}
        />
        <Route 
          exact
          path="/settings/goodies"
          component={Goodies}
        />
        <Route 
          exact
          path="/moodcheck"
          render={props => <MoodCheck setMood={this.setMood} {...props} />}
        />
        <Route 
          exact
          path="/moodboard"
          component={NewsFeed}
        />
      
      </BrowserRouter>
    );
  }
  
}

export default App;
