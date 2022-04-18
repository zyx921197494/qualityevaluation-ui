import React, { useState } from 'react';
import styles from './index.less';
import { createRegisterUsers } from '@/api/api';
import { Button, Upload, message, Divider, Steps, Progress } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { data } from 'browserslist';

const { Dragger } = Upload;
const { Step } = Steps;

function createAccount(props: any) {
  const [file, setFile] = useState({});
  const key = 'loading';

  // 下载模板
  const onDownload = () => {
    setCurrent(1);
  };

  // 上传文件
  const data = {
    name: 'file',
    accept: '.xlsx',
    multiple: false,
    method: 'post',
    // action: 'http://localhost:8080/admin/createRegisterUsers', // 上传接口url
    headers: {
      'Content-Type':
        'multipart/form-data; boundary=----WebKitFormBoundary' +
        Date.now().toString(16),
      Accept: '*/*',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    maxCount: 1,
    onChange(info: any) {
      const { status } = info.file;
      if (status === 'done') {
        console.log(info.file);
        message.success({ content: info.file.name + ' 上传成功', key });
        setFile(info.file);
        setCurrent(2);
      } else if (status === 'error') {
        message.error({ content: info.file.name + ' 上传失败', key });
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
    // onDrop(e: any) {
    //   message.success({ content: '拖拽上传 ' + e.dataTransfer.files[0].name + '成功', key })
    // },
    // onRemove(e: any) {
    //   message.success({ content: '取消上传 ' + file.name + '', key })
    // },
  };

  // 导入文件
  const onSubmit = () => {
    const key = 'updatable';
    if (file === null) {
      message.warning({ content: '请先上传文件', key });
      return;
    }
    message.loading({ content: 'Loading...', key, duration: 0 });
    console.log(file);
    createRegisterUsers({
      file: file,
    }).then((res: any) => {
      if (res.statusCode === 200) {
        message.success({ content: res.message, key });
      } else {
        message.error({ content: res.message, key });
      }
    });
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

        <Button
          className={styles.btn}
          type={'primary'}
          htmlType="submit"
          onClick={onSubmit}
        >
          导入
        </Button>

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
          <Step title="导入数据" description="点击右侧导入按钮" />
        </Steps>
      </div>
    </>
  );
}

export default createAccount;
