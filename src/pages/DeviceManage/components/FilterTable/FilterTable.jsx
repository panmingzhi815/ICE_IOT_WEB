/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { Table, Pagination } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';
import FilterForm from './Filter';

@DataBinder({
  tableData: {
    // 详细请求配置请参见 https://github.com/axios/axios
    url: '/device',
    method:'post',
    data: {
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
      total: 100,
      pageSize: 10,
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
    };
  }

  componentDidMount() {
    this.queryCache.page = 1;
    this.fetchData();
  }

  fetchData = () => {
    this.props.updateBindingData('tableData', {
      data: this.queryCache,
    });
  };

  renderTitle = (value, index, record) => {
    return (
      <div style={styles.titleWrapper}>
        <span style={styles.title}>{record.title}</span>
      </div>
    );
  };

  editItem = (record, e) => {
    e.preventDefault();
    // TODO: record 为该行所对应的数据，可自定义操作行为
  };

  renderOperations = (value, index, record) => {
    return (
      <div
        className="filter-table-operation"
        style={styles.filterTableOperation}
      >
        <a
          href="#"
          style={styles.operationItem}
          target="_blank"
          onClick={this.editItem.bind(this, record)}
        >
          解决
        </a>
        <a href="#" style={styles.operationItem} target="_blank">
          详情
        </a>
        <a href="#" style={styles.operationItem} target="_blank">
          分类
        </a>
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

  render() {
    const tableData = this.props.bindingData.tableData;
    const { filterFormValue } = this.state;

    return (
      <div className="filter-table">
        <IceContainer>
          <FilterForm
            value={filterFormValue}
            onChange={this.filterFormChange}
            onSubmit={this.filterTable}
            onReset={this.resetFilter}
          />
        </IceContainer>
        <IceContainer title="设备列表">
          <Table
            dataSource={tableData.list}
            isLoading={tableData.__loading}
            className="basic-table"
            style={styles.basicTable}
            hasBorder={false}
          >
            <Table.Column title="标识" dataIndex='gatewayId' width={150}/>
            <Table.Column title="名称" dataIndex="deviceInfo.name" width={85} />
            <Table.Column title="类型" dataIndex="deviceInfo.deviceType" width={85} />
            <Table.Column title="位置" dataIndex="deviceInfo.location" width={85} />
            <Table.Column title="状态" dataIndex="deviceInfo.status" cell={this.renderStatus} width={85} />
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
