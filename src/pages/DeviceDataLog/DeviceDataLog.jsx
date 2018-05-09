import React, { Component } from 'react';
import FilterTable from './components/FilterTable';

export default class DeviceDataLog extends Component {
  static displayName = 'DeviceDataLog';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="device-data-log-page">
        <FilterTable />
      </div>
    );
  }
}
