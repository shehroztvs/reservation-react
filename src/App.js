import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

import PartySelect from './components/PartySelect';
import TimeOptions from './components/TimeOptions';
import NameInput from './components/NameInput';
import PhoneInput from './components/PhoneInput';

import PageShell from './components/common/PageShell';

import './App.css';

import reducers from './reducers'
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';

class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducers,{},applyMiddleware(ReduxThunk))}>
        <Router basename='/reservation-react/'>
          <Switch>
            <Route exact path="/" component={PageShell(PartySelect)} />
            <Route path="/stepTwo" component={PageShell(TimeOptions)} />
            <Route path="/stepThree" component={PageShell(NameInput)} />
            <Route path="/stepFour" component={PageShell(PhoneInput)} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;