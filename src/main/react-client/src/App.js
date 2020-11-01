import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route} from 'react-router-dom';
import './App.css';
import { NavBar } from './components/Navbar';
import ExercisePlans from './containers/ExercisePlans';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="plans/new"></Route>
      </Switch>
      <NavBar/>
      <div className="App">
        <ExercisePlans/>
      </div>
    </Router>
  );
}

export default App;
