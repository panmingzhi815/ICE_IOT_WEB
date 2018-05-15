import React, { Component } from 'react';
import { Dialog, Grid, Input, Radio, Button ,Select,Feedback} from '@icedesign/base';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { enquireScreen } from 'enquire-js';
import axios from 'axios';

const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;

const defaultValue = {
  password: '',
  passwordId: '',
  cardId:'',
  type: '添加',
};

export default class AddPassword extends Component {
  static displayName = 'AddPassword';

  constructor(props) {
    super(props);
    this.state = {
      value: defaultValue,
    };
  }

  componentDidMount() {
    this.enquireScreenRegister();
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => { }, mediaCondition);
  };

  onOk = () => {
    var that = this;
    this.refForm.validateAll((error) => {
      if (error) {
        // show validate error
        return;
      }
      console.log(that.state.value)
      if(this.state.value.type == '添加'){
        axios.post('/password?deviceId=' + that.props.deviceId + "&password=" + that.state.value.password + "&cardId="+that.state.value.cardId + "&passwordId=" + that.state.value.passwordId).then((response) => {
          console.log(response);
          if(response.data['errorCode'] != undefined){
            Feedback.toast.error(response.data['errorMsg']);
          }else{
            Feedback.toast.success('操作成功');
            that.showPasswordDialog();
          }
        }).catch(function (error) {
          Feedback.toast.error('操作失败');
        });
      }else{
        axios.delete('/password?deviceId=' + that.props.deviceId + "&passwordId=" + that.state.value.passwordId).then((response) => {
          console.log(response);
          if(response.data['errorCode'] != undefined){
            Feedback.toast.error(response.data['errorMsg']);
          }else{
            Feedback.toast.success('操作成功');
            that.showPasswordDialog();
          }
        }).catch(function (error) {
          Feedback.toast.error('操作失败');
        });
      }
    });
  };

  showPasswordDialog(){
    this.props.showPasswordDialog(false);
  }

  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  render() {
    const { isMobile } = this.state;
    const simpleFormDialog = {
      ...styles.simpleFormDialog,
    };
    // 响应式处理
    if (isMobile) {
      simpleFormDialog.width = '300px';
    }

    return (
        <Dialog
          className="simple-form-dialog"
          style={simpleFormDialog}
          autoFocus={false}
          footerAlign="center"
          title="密码管理"
          {...this.props}
          onOk={this.onOk}
          onCancel={this.showPasswordDialog.bind(this,false)}
          onClose={this.showPasswordDialog.bind(this,false)}
          isFullScreen
          visible={true}
        >
          <IceFormBinderWrapper
            ref={(ref) => {
              this.refForm = ref;
            }}
            value={this.state.value}
            onChange={this.onFormChange}
          >
            <div style={styles.dialogContent}>
            <Row style={styles.formRow}>
                <Col span={3}>
                  <label style={styles.formLabel}>类型</label>
                </Col>
                <Col span={16}>
                  <IceFormBinder required>
                    <Select style={styles.input} name="type">
                      <Select.Option value="添加">添加</Select.Option>
                      <Select.Option value="删除">删除</Select.Option>
                    </Select>
                  </IceFormBinder>
                  <IceFormError name="type" />
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col span={3}>
                  <label style={styles.formLabel}>用户ID</label>
                </Col>
                <Col span={16}>
                  <IceFormBinder required message="必填">
                    <Input
                      name="passwordId"
                      style={styles.input}
                      placeholder="用户ID"
                    />
                  </IceFormBinder>
                  <IceFormError name="passwordId" />
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col span={3}>
                  <label style={styles.formLabel}>密 码</label>
                </Col>
                <Col span={16}>
                  <IceFormBinder >
                    <Input
                      name="password"
                      style={styles.input}
                      placeholder="用户密码"
                    />
                  </IceFormBinder>
                  <IceFormError name="password" />
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col span={3}>
                  <label style={styles.formLabel}>卡 片</label>
                </Col>
                <Col span={16}>
                  <IceFormBinder >
                    <Input
                      trim = {true}
                      name="cardId"
                      style={styles.input}
                      placeholder="用户卡片"
                    />
                  </IceFormBinder>
                  <IceFormError name="cardId" />
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </Dialog>
    );
  }
}

const styles = {
  simpleFormDialog: { width: '640px' },
  dialogContent: {},
  formRow: { marginTop: 20 },
  input: { width: '100%' },
  formLabel: { lineHeight: '26px' },
};
