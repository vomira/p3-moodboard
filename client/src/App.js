import React, { useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import { Redirect, Route } from 'react-router-dom';
import Goodies from './components/settings/Goodies';
import Homepage from './components/Homepage';
import Languages from './components/settings/Languages';
import Login from './components/auth/Login';
import MoodCheck from './components/settings/MoodCheck';
import NewsFeed from './components/NewsFeed';
import NavBar from './components/NavBar.js';
import NewsPreferences from './components/settings/NewsPreferences.js';
import Signup from './components/auth/Signup';


const App = (props) => {

  const [user, setUser] = useState(props.user);
  const [mood, setMood] = useState('');


    return (
      <>
      <NavBar 
      user={user} 
      setState={setUser}
      />
     
        <Route 
          exact
          path="/"
          render={props => <Homepage user={user} {...props} />}
        />
        <Route 
          exact
          path="/login"
          render={props => <Login setUser={setUser} setMood={setMood} {...props} />}
        />
        <Route 
          exact
          path="/signup"
          render={props => <Signup setUser={setUser} {...props} />}
        />
        <Route
          exact
          path="/settings/lang"
          render={props => <Languages user={user} {...props} />}
        />
        <Route
          exact
          path="/settings/news"
          render={props => <NewsPreferences user={user} {...props} />}
        />
        <Route 
          exact
          path="/settings/goodies"
          render={props => <Goodies user={user} {...props} />}
        />
        <Route 
          exact
          path="/moodcheck"
          render={props => <MoodCheck setMood={setMood} user={user} {...props} />}
        />
        <Route 
          exact
          path="/moodboard"
          render={props => {
            if (user) {
              return <NewsFeed mood={mood} user={user} {...props} />
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
  
      </>
      
    );
}

export default App;
