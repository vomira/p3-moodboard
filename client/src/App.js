import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import { BrowserRouter, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Languages from './components/settings/Languages';
import Main from './components/Main';
import NavBar from './components/NavBar.js';
import NewsPreferences from './components/settings/NewsPreferences.js';
import Signup from './components/auth/Signup';


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Route 
        exact
        path="/"
        component={Homepage}
      />
      <Route 
        exact
        path="/signup"
        component={Signup}
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
        path="/moodboard"
        component={Main}
      />
    
    </BrowserRouter>
  );
}

export default App;
