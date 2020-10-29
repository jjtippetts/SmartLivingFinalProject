import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { NavBar } from './components/Navbar';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="plans"></Route>
        <Route path="plans/new"></Route>
      </Switch>
      <NavBar/>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </Router>
  );
}

export default App;
