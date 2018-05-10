import React, { Component } from 'react';
import FilterTable from './components/FilterTable';
import ProgressTable from './components/ProgressTable';
import DeviceForm from './components/DeviceForm';
import {
  Router,
  hashHistory,
} from 'react-router';
import axios from 'axios';

export default class DeviceManage extends Component {
  static displayName = 'DeviceManage';

  constructor(props) {
    super(props);
    this.state = {type:'list',value:''}
  }

  
  showLog(type,value){
    this.setState({
      type:type,
      value:value
    });
  }

  render() {
    const type = this.state.type;
    const value = this.state.value;
    if(type == undefined || type == 'list'){
      return (
        <div className="device-manage-page">
          <FilterTable showLog = {this.showLog.bind(this)} />
        </div>
      );
    }else if(type == 'log'){
      return (
        <div className="device-manage-page">
          <ProgressTable showLog = {this.showLog.bind(this)} gatewayId = {value}/>
        </div>
      );
    }else if(type == 'add'){
      return (
        <div className="device-manage-page">
          <DeviceForm showLog = {this.showLog.bind(this)}/>
        </div>
      );
    }

  }
}
