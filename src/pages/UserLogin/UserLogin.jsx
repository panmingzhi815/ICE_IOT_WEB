import React, { Component } from 'react';
import Login from './components/UserLogin';


export default class UserLogin extends Component {
  static displayName = '用户登录';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="user-login-page">
        <Login />
      </div>
    );
  }
}
