import React, { useState } from 'react';
import LayoutWrap from '@/components/layoutWrap';
import styles from './index.less';

import { Button, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

function createAccount(props) {
  const [file, setFile] = useState(null);
  const data = {
    name: 'file',
    multiple: false,
    action: '', // 上传接口url
    maxCount: 1,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        +message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      // console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <LayoutWrap>
      <div className={styles.uploadArea}>
        <Dragger {...data}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或拖拽上传文件</p>
          <p className="ant-upload-hint">
            点击右侧按钮下载模板文件，填写后上传。
            <br />
            注：请勿修改文件名以及表头
          </p>
        </Dragger>
        <Button className={styles.btn} type={'primary'}>
          导入
        </Button>
        <Button className={styles.btn} type={'primary'}>
          下载模板
        </Button>
      </div>
    </LayoutWrap>
  );
}

export default createAccount;
