import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './app/containers/Login';
import Home from './app/containers/Home';
import AuthGard from './app/components/AuthGard';
import LoginGard from './app/components/LoginGard';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <AuthGard component={<Route path="/home" component={Home} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
