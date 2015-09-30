'use strict';

import React from 'react';
import LoginStore from '../stores/LoginStore';
import { Route, RouteHandler, Link } from 'react-router';
import AuthService from '../services/AuthService';
import { FormattedMessage } from 'react-intl-es6';

export default class AuthenticatedApp extends React.Component {
  
  constructor() {
    super();
    this.state = this._getLoginState();
  }

  static contextTypes = {
    intl: React.PropTypes.object
  };

  _getLoginState() {
    return {
      userLoggedIn: LoginStore.isLoggedIn()
    };
  }

  componentDidMount() {
    this.changeListener = this._onChange.bind(this);
    LoginStore.addChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState(this._getLoginState());
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this.changeListener);
  }

  render() {
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-default">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">
              <FormattedMessage
                message={this.context.intl.getMessage('app.title')} />
            </a>
          </div>
          {this.headerItems}
        </nav>
        <RouteHandler/>
      </div>
    );
  }

  logout(e) {
    e.preventDefault();
    AuthService.logout();
  }

  get headerItems() {
    const getIntlMessage = this.props.getIntlMessage;
    if (!this.state.userLoggedIn) {
      return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="login">
          <FormattedMessage message={this.context.intl.getMessage('app.login')} /></Link>
        </li>
        <li>
          <Link to="signup"><FormattedMessage message={this.context.intl.getMessage('app.signup')} /></Link>
        </li>
      </ul>)
    } else {
      return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="home"><FormattedMessage message={this.context.intl.getMessage('app.home')} /></Link>
        </li>
        <li>
          <Link to="quote"><FormattedMessage message={this.context.intl.getMessage('app.quote')} /></Link>
        </li>
        <li>
          <a href="" onClick={this.logout}>Logout</a>
        </li>
      </ul>)
    }
  }
};
