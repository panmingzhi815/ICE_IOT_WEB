/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Select,Feedback } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import axios from 'axios';

const { Row, Col } = Grid;
export default class DeviceForm extends Component {
  static displayName = 'DeviceForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
        deviceId: '',
        deviceType: '',
        manufacturerId: '',
        model: '',
      },
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      console.log('values', values);
      axios.post('/device',values).then((response) => {
        console.log(response);
        if(response.data['verifyCode'] != undefined){
          Feedback.toast.success('添加成功');
          this.showLog('list','');
        }else{
          Feedback.toast.error('添加失败');
        }
      }).catch(function (error) {
        console.log(error);
        Feedback.toast.error('添加失败');
      });;
    });
  };

  
  showLog(type,value){
    this.props.showLog(type,value);
  }


  render() {
    return (
      <div className="user-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>添加设备</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  名称：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="name" required message="必填">
                    <Input
                      size="large"
                      placeholder=""
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  IMEI：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="deviceId" required message="必填">
                    <Input
                        size="large"
                        placeholder=""
                        style={{ width: '100%' }}
                      />
                  </IceFormBinder>
                  <IceFormError name="deviceId" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  类型：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="deviceType" required message="必选" >
                    <Select
                      style={{ width: '100%' }}
                      size="large"
                      placeholder="请选择..."
                      dataSource={[
                        { label: 'DongLuHitecSensor', value: 'DongLuHitecSensor' },
                        { label: 'DoorLock', value: 'DoorLock' },
                      ]}
                    />
                  </IceFormBinder>
                  <IceFormError name="deviceType" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  厂商：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="manufacturerId" required message="必选" >
                    <Select
                      style={{ width: '100%' }}
                      size="large"
                      placeholder="请选择..."
                      dataSource={[
                        { label: 'DLSensor', value: 'DLSensor/DongLuHitec' },
                        { label: 'DLS1010', value: 'DLS1010/DongLuHitec' },
                      ]}
                    />
                  </IceFormBinder>
                  <IceFormError name="manufacturerId" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  型号：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="model" required message="必选" >
                    <Select
                      style={{ width: '100%' }}
                      size="large"
                      placeholder="请选择..."
                      dataSource={[
                        { label: 'NBIotLock', value: 'NBIotLock' },
                        { label: 'DLNBiot', value: 'DLNBiot' },
                      ]}
                    />
                  </IceFormBinder>
                  <IceFormError name="model" />
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>

          <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              <Button
                size="large"
                type="primary"
                onClick={this.validateAllFormField}
              >
                提 交
              </Button>
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    marginBottom: 25,
  },
  formLabel: {
    height: '32px',
    lineHeight: '32px',
    textAlign: 'right',
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};
