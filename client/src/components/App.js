// import logo from './logo.svg';
import '../App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Signup from './Signup';
import NotFound from './NotFound';
import LoginSignup from './LoginSignup';

function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/"><Home /> </Route>
        <Route path="/login"> <Login /> </Route>
        <Route path="/signup"> <Signup /> </Route>
        {/* <Route path="/enter"><LoginSignup /></Route> */}


        <Route path="*"><NotFound /></Route>
      </Switch>
    </Router>

  );
}

export default App;
