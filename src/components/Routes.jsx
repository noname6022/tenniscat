import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StartScreen from './StartScreen';
import ConfirmStartScreen from './ConfirmStartScreeen';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={StartScreen} />
        <Route component={ConfirmStartScreen} />
      </Switch>
    </Router>
  );
}

export default App;
