/* eslint no-mixed-operators:0 */
import React, { Component } from 'react';
import { Table, Progress, Pagination,Button } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';

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
    this.props.updateBindingData('tableData', {
      data: {gatewayId:this.props.gatewayId},
    });
  }

  render() {
    const tableData = this.props.bindingData.tableData;
    return (
      <div className="progress-table">
        <IceContainer className="tab-card" title="设备日志" >
        <div style={styles.title}>
          <Button type="primary" onClick={this.showLog.bind(this,'list','')}>返回列表</Button>
        </div>
        
        <Table
            dataSource={tableData.list}
            isLoading={tableData.__loading}
            className="basic-table"
            style={styles.basicTable}
            hasBorder={false}
          >
            <Table.Column title="标识" dataIndex='gatewayId' width={150}/>
            <Table.Column title="内容" dataIndex="service" width={400} />
            <Table.Column title="时间" dataIndex="date" width={150} />
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
  }
};
