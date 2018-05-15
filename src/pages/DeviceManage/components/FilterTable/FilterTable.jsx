/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { Table, Pagination ,Button,Icon,Dialog,Feedback} from '@icedesign/base';
import { Link } from 'react-router-dom';
import FoundationSymbol from 'foundation-symbol';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';
import FilterForm from './Filter';
import AddPassword from './../AddPassword';
import axios from 'axios';
@DataBinder({
  tableData: {
    // 详细请求配置请参见 https://github.com/axios/axios
    url: '/device',
    params: {
      pageNo: 0,
      pageSize:20
    },
    responseFormatter: (responseHandler, res, originResponse) => {
      // 做一些数据转换
      const newRes = {
        status: 'SUCCESS',
        data: {
          currentPage:res['pageNo'],
          pageSize:res['pageSize'],
          total:res['totalCount'],
          list:res['devices']
        }
      };
      // 不做回传处理会导致数据更新逻辑中断
      responseHandler(newRes, originResponse);
    },
    defaultBindingData: {
      list: [],
      total: 0,
      pageSize: 20,
      currentPage: 1,
    },
  },
})
export default class EnhanceTable extends Component {
  static displayName = 'EnhanceTable';

  static defaultProps = {};

  constructor(props) {
    super(props);

    // 请求参数缓存
    this.queryCache = {};
    this.state = {
      filterFormValue: {},
      search:false,
      AddPasswordVisiable:false,
      addPasswordDeviceId:''
    };
  }

  componentWillMount = () =>{
    console.log("load data first")
    this.queryCache = {};
    this.fetchData();
    this.timer = setInterval(() => {
        console.log('自动刷新设备列表');
        this.fetchData();
      },
      5000
    );
  }

  componentWillUnmount=() =>{
    this.timer && clearTimeout(this.timer);
  }

  fetchData = () => {
    this.props.updateBindingData('tableData', {
      params: this.queryCache,
    });
  };

  showLog(type,value){
    this.props.showLog(type,value);
  }

  confirmDelete(value) {
    const that = this;
    Dialog.confirm({
      title:"提示",
      content: "您确定要删除这个设备吗？",
      locale: {
        ok: "确认",
        cancel: "取消"
      },
      onOk:function(){
        axios.delete('/device?deviceId=' + value).then((response) => {
          console.log(response);
          if(response.data['result']['errorCode'] != undefined){
            Feedback.toast.error(response.data['errorMsg']);
            Feedback.toast.error('操作失败');
          }else{
            Feedback.toast.success('删除成功');
            that.fetchData();
          }
        }).catch(function (error) {
          console.log(error);
          Feedback.toast.error('操作失败');
        });
      }
    });
  };

  showPasswordDialog(visible,deviceId){
    this.setState({AddPasswordVisiable:visible,selectDeviceId:deviceId})
  }

  showCardDialog(visible,deviceId){
    this.setState({AddCardVisiable:visible,selectDeviceId:deviceId})
  }

  renderOperations = (value) => {
    return (
      <div>
        <Button type="primary" onClick={this.showLog.bind(this,'log',value)} >日志</Button>
        &nbsp;
        <Button type="normal" shape="warning" onClick={this.confirmDelete.bind(this,value)} >删除</Button>
        &nbsp;
        <Button type="normal" onClick={this.showPasswordDialog.bind(this,true,value)} >卡密码</Button>
      </div>
    );
  };

  renderStatus = (value) => {
    if(value == "ONLINE"){
      return (<IceLabel status="success">在线</IceLabel>);
    }else if(value = "OFFLINE"){
      return (<IceLabel status="default">不在线</IceLabel>);
    }else if(value = "ABNORMAL"){
      <IceLabel status="danger">异常</IceLabel>
    }else{
      <IceLabel inverse={false} status="default">{value}</IceLabel>
    }
  };

  changePage = (currentPage) => {
    this.queryCache.page = currentPage;
    this.fetchData();
  };

  filterFormChange = (value) => {
    this.setState({
      filterFormValue: value,
    });
  };

  filterTable = () => {
    // 合并参数，请求数据
    this.queryCache = {
      ...this.queryCache,
      ...this.state.filterFormValue,
    };
    this.fetchData();
  };

  resetFilter = () => {
    this.setState({
      filterFormValue: {},
    });
  };

  onShowSearch(){
    console.log('onShowSearch:' + this.state.search);
    this.setState({
      search:!this.state.search
    });
  }

  refreshDevice(){
    this.fetchData();
  }

  render() {
    const tableData = this.props.bindingData.tableData;
    const { filterFormValue } = this.state;

    return (
      <div className="filter-table">
        <IceContainer>
          <div>
          <Button type="primary" onClick={this.showLog.bind(this,'add','')}>
            <Icon type="add" />添加
          </Button>
          &nbsp;
          <Button type="primary" onClick={this.onShowSearch.bind(this)}>
            <Icon type="search" />搜索
          </Button>
          &nbsp;
          <Button type="primary" onClick={this.refreshDevice.bind(this)}>
            <Icon type="refresh" />刷新
          </Button>
          </div>
        </IceContainer>
        
        {this.state.search && (
              <IceContainer>
                <FilterForm
                  value={filterFormValue}
                  onChange={this.filterFormChange}
                  onSubmit={this.filterTable}
                  onReset={this.resetFilter}
                />
              </IceContainer>
            )}
        <IceContainer title="设备列表">
          <Table
            dataSource={tableData.list}
            className="basic-table"
            style={styles.basicTable}
            hasBorder={false}
          >
            <Table.Column title="标识" dataIndex='gatewayId' width={150}/>
            <Table.Column title="名称" dataIndex="deviceInfo.name" width={85} />
            <Table.Column title="类型" dataIndex="deviceInfo.deviceType" width={85} />
            <Table.Column title="电量" dataIndex="deviceInfo.batteryLevel" width={50} />
            <Table.Column title="信号" dataIndex="deviceInfo.signalStrength" width={50} />
            <Table.Column title="锁" dataIndex="deviceInfo.statusDetail" width={50} />
            <Table.Column title="状态" dataIndex="deviceInfo.status" cell={this.renderStatus} width={85} />
            <Table.Column title="操作" dataIndex="deviceId" cell={this.renderOperations} width={150} />
          </Table>
          <div style={styles.paginationWrapper}>
            <Pagination
              current={tableData.currentPage}
              pageSize={tableData.pageSize}
              total={tableData.total}
              onChange={this.changePage}
            />
          </div>
        </IceContainer>
        {this.state.AddPasswordVisiable && <AddPassword showPasswordDialog={this.showPasswordDialog.bind(this)} deviceId = {this.state.selectDeviceId}/>}
      </div>
    );
  }
}

const styles = {
  filterTableOperation: {
    lineHeight: '28px',
  },
  operationItem: {
    marginRight: '12px',
    textDecoration: 'none',
    color: '#5485F7',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    marginLeft: '10px',
    lineHeight: '20px',
  },
  paginationWrapper: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
