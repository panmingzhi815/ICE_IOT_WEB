import React, { Component } from 'react';

export default class ProductFeatureDark extends Component {
  static displayName = 'ProductFeatureDark';

  render() {
    return (
      <div style={styles.wrapperContainer}>
        <div style={styles.wrapper}>
          <div style={styles.feature}>
            <div style={styles.title}>东云物联网</div>
            <div style={styles.line}>
              <div style={styles.lineHeader} />
            </div>
            <div style={styles.desc}>
              自定义更简洁、更轻快的物联网设备接口。轻量级管理、高性能运作、持续为企业提供智能服务。
            </div>
          </div>
          <div style={styles.cover}>
            <img
              alt="特点图"
              style={styles.coverImage}
              src={require('../../../../image/flat.png')}
            />
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  wrapperContainer: {
    backgroundColor: '#f6f6f6',
    backgroundImage:
      'url(//img.alicdn.com/tfs/TB1P7ELpwmTBuNjy1XbXXaMrVXa-3798-1000.png)',
    backgroundSize: 'cover',
  },
  wrapper: {
    position: 'relative',

    height: 500,
    overflow: 'hidden',
    maxWidth: 1190,
    margin: '0 auto',
  },
  feature: {
    paddingTop: 160,
    paddingBottom: 160,
    paddingLeft: 30,
    backgroundImage:
      'url(https://img.alicdn.com/tfs/TB1A5MNpuuSBuNjy1XcXXcYjFXa-66-66.png)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '10px 120px',
    zIndex: 2,
    top: 0,
    right: '70%',
    position: 'absolute',
  },
  line: {
    height: 2,
    width: 140,
    backgroundColor: 'rgba(255,255,255,0.4)',
    margin: '20px 0',
  },
  lineHeader: {
    height: 2,
    width: 33,
    backgroundColor: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 36,
    textShadow: '0 0 3px rgba(0,0,0,0.3)',
  },
  desc: {
    fontSize: 16,
    color: '#fff',
    lineHeight: '26px',
    maxWidth: 280,
    textShadow: '0 0 1px rgba(0,0,0,0.3)',
  },
  cover: {
    position: 'absolute',
    left: '40%',
    bottom: 0,
    zIndex: 1,
  },
  coverImage: {
    maxHeight: 430,
    display: 'block',
  },
};
