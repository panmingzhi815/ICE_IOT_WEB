import React, { Component } from 'react';
import { Input, Grid, Select, Button, DatePicker } from '@icedesign/base';

// form binder 详细用法请参见官方文档
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';

const { Row, Col } = Grid;
const { Option } = Select;

export default class Filter extends Component {
  static displayName = 'Filter';

  render() {
    return (
      <IceFormBinderWrapper
        value={this.props.value}
        onChange={this.props.onChange}
      >
        <div>
          <Row wrap>
            <Col xxs={24} xs={12} l={6} style={styles.filterCol}>
              <label style={styles.filterTitle}>标识</label>
              <IceFormBinder>
                <Input style={styles.filterItem} name="gatewayId" />
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={6} style={styles.filterCol}>
              <label style={styles.filterTitle}>状态</label>
              <IceFormBinder>
                <Select style={styles.filterItem} name="status">
                    <Select.Option value="">全部</Select.Option>
                    <Select.Option value="ONLINE">在线</Select.Option>
                    <Select.Option value="OFFLINE">不在线</Select.Option>
                    <Select.Option value="ABNORMAL">异常</Select.Option>
                </Select>
              </IceFormBinder>
            </Col>
            <Col xxs={24} xs={12} l={6} style={styles.filterCol}>
            <div
              style={{
                textAlign: 'left',
                marginLeft: '12px',
              }}
            >
              <Button
                onClick={this.props.onSubmit}
                type="primary"
                style={{ marginLeft: '10px' }}
              >
                确定
              </Button>
            </div>
            </Col>
          </Row>
        </div>
      </IceFormBinderWrapper>
    );
  }
}

const styles = {
  filterCol: {
    display: 'flex',
    alignItems: 'center',
  },

  filterItem:{
    width:"200px"
  },

  filterTitle: {
    textAlign: 'left',
    marginRight: '12px',
    fontSize: '14px',
  },

  filterTool: {
    width: '200px',
  },
};
