import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Schedule from './components/Schedule';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import React from 'react';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            
            <Home/>
          </Route>
          <Route path="/schedule">
            <>
            <Navbar/>
            <Schedule/>
            </>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/register">
            <Register/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
