/* eslint no-mixed-operators:0 */
import React, { Component } from 'react';
import { Table, Progress, Pagination,Button ,Feedback,Icon} from '@icedesign/base';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import axios from 'axios';
import { Grid } from "@icedesign/base";

const { Row, Col } = Grid;
@DataBinder({
  tableData: {
    // 详细请求配置请参见 https://github.com/axios/axios
    url: '/device/log',
    method:'post',
    data: {
      pageNo: 0,
      pageSize:10
    },
    responseFormatter: (responseHandler, res, originResponse) => {
      // 做一些数据转换
      const newRes = {
        status: 'SUCCESS',
        data: {
          currentPage:res['number']+1,
          pageSize:res['size'],
          total:res['totalElements'],
          list:res['content']
        }
      };
      // 不做回传处理会导致数据更新逻辑中断
      responseHandler(newRes, originResponse);
    },
    defaultBindingData: {
      list: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
    },
  },
})

export default class ProgressTable extends Component {
  static displayName = 'ProgressTable';

  constructor(props) {
    super(props);
  }

  onPageChange = (pageNo) => {
    this.props.updateBindingData('tableData', {
      data: {gatewayId:this.props.gatewayId,pageNo:pageNo-1},
    });
  };

  showLog(e){
    this.props.showLog(e);
  }

  componentDidMount(){
    console.log("componentDidMount");
    this.fetchData();
    this.timer = setInterval(() => {
      console.log('自动刷新设备日志列表');
      this.fetchData();
      },
      5000
    );
  }

  
  componentWillUnmount=() =>{
    this.timer && clearTimeout(this.timer);
  }

  fetchData(){
    this.props.updateBindingData('tableData', {
      data: {gatewayId:this.props.gatewayId},
    });
  }

  deleteAllLog(){
    const that = this;
    axios.delete('/device/'+this.props.gatewayId+'/log').then((response) => {
      console.log(response);
      if(response.data['errorCode'] != undefined){
        Feedback.toast.error(response.data['errorMsg']);
      }else{
        Feedback.toast.success('删除成功');
        that.fetchData();
      }
    }).catch(function (error) {
      console.log(error);
      Feedback.toast.error('操作失败');
    });
  }

  render() {
    const tableData = this.props.bindingData.tableData;
    return (
      <div className="progress-table">
        <IceContainer className="tab-card" title="设备日志" >
        <div style={styles.title}>
          

        </div>
        <Row>
          <Col style={styles.alignLeft}>
            <Button type="primary" shape="text" onClick={this.showLog.bind(this,'list','')}><Icon type="arrow-left" /> 返回列表</Button>&nbsp;</Col>
          <Col style={styles.alignRight}>
            <Button type="primary" onClick={this.fetchData.bind(this)}><Icon type="refresh" />刷新日志</Button>&nbsp;
            <Button type="primary" shape="warning" onClick={this.deleteAllLog.bind(this)}><Icon type="ashbin" />清空日志</Button>
          </Col>
        </Row>
        
        <Table
            dataSource={tableData.list}
            className="basic-table"
            style={styles.basicTable}
            hasBorder={false}
          >
            <Table.Column title="标识" dataIndex='serviceId' width={150}/>
            <Table.Column title="内容" dataIndex="data" width={400} />
            <Table.Column title="时间" dataIndex="createTime" width={150} />
          </Table>
          <div style={styles.paginationWrapper}>
            <Pagination
              current={tableData.currentPage}
              pageSize={tableData.pageSize}
              total={tableData.total}
              onChange={this.onPageChange}
            />
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  paginationWrapper: {
    display: 'flex',
    padding: '20px 0 0 0',
    flexDirection: 'row-reverse',
  },
  title:{
    margin:'0 0 10px 0'
  },
  alignRight:{
      textAlign:'right'
  }
};
