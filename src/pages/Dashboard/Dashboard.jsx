import React, { Component } from 'react';
import ProductFeatureDark from './components/ProductFeatureDark';

export default class Dashboard extends Component {
  static displayName = 'Dashboard';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="dashboard-page">
        <ProductFeatureDark />
      </div>
    );
  }
}
