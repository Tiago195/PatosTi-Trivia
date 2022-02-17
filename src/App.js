import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Games';
import Settings from './pages/settingPage';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

function App() {
  return (
    <>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ Ranking } />
    </>
  );
}

export default App;
