import React, { Component } from 'react';
import FilterTable from './components/FilterTable';
import {
  Router,
  hashHistory,
} from 'react-router';
import axios from 'axios';

export default class DeviceManage extends Component {
  static displayName = 'DeviceManage';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="device-manage-page">
        <FilterTable />
      </div>
    );
  }
}
