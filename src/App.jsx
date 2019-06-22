import React,{ Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/login';
import Admit from './pages/admit';

export default class App extends Component {
  render() {
    return <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Admit} />
      </Switch>;
  }
}
