import React from 'react';
import Router, {Route} from 'react-router';
import AuthenticatedApp from './components/AuthenticatedApp';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Quote from './components/Quote';
import RouterContainer from './services/RouterContainer';
import LoginActions from './actions/LoginActions';
import {Intl} from 'react-intl-es6';

var includeFolder = require('include-folder'),
    messages = includeFolder("src/intl");

for(var locale in messages) {
  messages[locale] = JSON.parse(messages[locale]).messages;
}

var locale = navigator.language.split('-');
locale = locale[1] ? `${locale[0]}_${locale[1].toUpperCase()}` : navigator.language;

var strings = messages[locale] ? messages[locale] : messages['en_US'];
//strings = Object.assign(messages['en_US'], strings);

var intlData = {
  locales : ['en-US'],
  messages: strings
};

class App extends Intl {
  constructor() {
    super( intlData.locales, intlData.messages );
  }

  render() {
    return (<AuthenticatedApp />);
  }
};

var routes = (
  <Route handler={App}>
    <Route name="login" handler={Login}/>
    <Route name="signup" handler={Signup}/>
    <Route name="home" path="/" handler={Home}/>
    <Route name="quote" handler={Quote}/>
  </Route>
);

var router = Router.create({routes});
RouterContainer.set(router);

let jwt = localStorage.getItem('jwt');
if (jwt) {
  LoginActions.loginUser(jwt);
}

router.run(function (Handler) {
  React.render(<Handler {...intlData} />, document.getElementById('content'));
});

