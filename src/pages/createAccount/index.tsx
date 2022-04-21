import React, { useState } from 'react';
import styles from './index.less';
import { download } from '@/api/api';
import { Button, Upload, message, Divider, Steps, Progress } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { data } from 'browserslist';

const { Dragger } = Upload;
const { Step } = Steps;

function createAccount(props: any) {
  const [file, setFile] = useState({});

  // 下载模板
  const onDownload = () => {
    const key = 'updatable';
    message.loading({ content: 'Loading...', key, duration: 0 });
    download({
      path: null,
      filenames: ['园所信息表.xlsx'],
    }).then((res: any) => {
      if (res.statusCode === 200) {
        message.success({ content: res.message, key });
      } else {
        message.error({ content: res.message, key });
      }
    });
    setCurrent(1);
  };

  const key = 'Loading';
  // 上传文件
  const data = {
    name: 'file',
    accept: '.xlsx',
    multiple: false,
    method: 'post',
    action: 'http://localhost:8080/admin/createRegisterUsers', // 接口url
    maxCount: 1,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    onChange(info: any) {
      message.loading({ content: key, key });
      const { status } = info.file;
      if (status === 'done') {
        message.success({ content: `${info.file.name} 上传成功`, key });
      } else if (status === 'error') {
        message.error({ content: `${info.file.name} 上传失败`, key });
      }
    },
    progress: {
      type: 'line',
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent: number) => `${parseFloat(percent.toFixed(2))}%`,
    },
    onDrop: {},
  };

  // 控制steps组件
  const [Current, setCurrent] = useState(0);

  return (
    <>
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

        <Button className={styles.btn} type={'primary'} onClick={onDownload}>
          下载模板
        </Button>
      </div>

      <Divider />

      <div className={styles.steps}>
        <Steps current={Current}>
          <Step
            title="下载模板"
            description="点击右侧下载模板按钮下载上传模板，并填写信息"
          />
          <Step title="上传文件" description="点击或拖拽上传填写好的模板文件" />
        </Steps>
      </div>
    </>
  );
}

export default createAccount;
