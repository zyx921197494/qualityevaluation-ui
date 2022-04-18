import React, { useState } from 'react';
import styles from './index.less';
import {
  listLocationReport,
  uploadLocationReport,
  downloadLocationReport,
  deleteLocationReport,
} from '@/api/api';
import { Button, Select, Form, Table, Upload, Divider, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

function locationReport(props: any) {
  const columns = [
    {
      title: '报告ID',
      dataIndex: 'id',
    },
    {
      title: '年份',
      dataIndex: 'year',
    },
    {
      title: '地区',
      dataIndex: 'locationName',
    },
    {
      title: '文件名',
      dataIndex: 'fileName',
    },
    {
      title: '上传日期',
      dataIndex: 'uploadTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
    },
  ];

  // 按年份查询报告
  const [Report, setReport] = useState([]);
  const onFinish = (values: any) => {
    const key = 'Loading';
    message.loading({ content: 'Loading...', key, duration: 0 });
    listLocationReport({
      year: values.year == undefined ? '' : values.year,
    }).then((res: any) => {
      if (res.statusCode === 200) {
        message.success({ content: res.message, key });
        for (let item of res.data) {
          item.key = item.id; // report的id设为key
          const upload = item.uploadTime.split('T');
          item.uploadTime = upload[0] + ' ' + upload[1];
        }
        setReport(res.data);
      } else {
        message.error({ content: res.message, key });
      }
    });
  };

  // 上传报告

  const [file, setFile] = useState(null);
  const onUpload = () => {};

  // 下载报告
  const onDownload = () => {
    const key = 'Loading';
    message.loading({ content: '正在下载..', key, duration: 0 });
    downloadLocationReport({
      ids: selectedRowKeys,
    }).then((res: any) => {
      if (res.statusCode === 200) {
        message.success({ content: res.message, key });
      } else {
        message.error({ content: res.message, key });
      }
    });
  };

  // 删除报告
  const onDelete = () => {
    const key = 'Loading';
    message.loading({ content: '正在删除..', key, duration: 0 });
    deleteLocationReport({
      ids: selectedRowKeys,
    }).then((res: any) => {
      if (res.statusCode === 200) {
        message.success({ content: res.message, key });
      } else {
        message.error({ content: res.message, key });
      }
    });
  };

  const uploadFile = {
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

  // table组件
  const [selectedRowKeys, setselectedRowKeys] = useState<any>([]);
  const hasSelected = selectedRowKeys.length > 0;

  const start = () => {
    //初始化
    setselectedRowKeys([]);
  };

  const onSelectChange = (value: any) => {
    setselectedRowKeys([...value]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      <Divider orientation="left">查询区域报告</Divider>
      <div className={styles.area}>
        <Form layout="inline" onFinish={onFinish}>
          <Form.Item name="year">
            <Select
              className={styles.select}
              placeholder="请选择报告年份"
              allowClear
            >
              <Option key="2020" value="2020">
                2020
              </Option>
              <Option key="2021" value="2021">
                2021
              </Option>
              <Option key="2022" value="2022">
                2022
              </Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button className={styles.btn} type={'primary'} htmlType="submit">
              查询
            </Button>
          </Form.Item>
          <Form.Item>
            <Button className={styles.resetCondition} htmlType="reset">
              重置搜索条件
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Divider orientation="left">上传区域报告</Divider>

      <div className={styles.area}>
        <Form layout="inline" onFinish={onUpload}>
          <Form.Item name="year">
            <Select className={styles.select} placeholder="请选择上传年份">
              <Option key="2020" value="2020">
                2020
              </Option>
              <Option key="2021" value="2021">
                2021
              </Option>
              <Option key="2022" value="2022">
                2022
              </Option>
              <Option key="2023" value="2023">
                2023
              </Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Upload {...props}>
              <Button className={styles.bigBtn} icon={<UploadOutlined />}>
                上传文件
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button className={styles.btn} type={'primary'}>
              上传
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Divider orientation="left">下载/删除报告</Divider>

      <div className={styles.audit}>
        <Button
          className={styles.btn}
          type={'primary'}
          htmlType="submit"
          onClick={onDownload}
        >
          下载
        </Button>
        <Button
          className={styles.btn}
          type={'primary'}
          htmlType="submit"
          onClick={onDelete}
        >
          删除
        </Button>
      </div>

      <div>
        <Button
          className={styles.between}
          type="primary"
          onClick={start}
          disabled={!hasSelected}
        >
          重置选择
        </Button>
        <span style={{ marginLeft: 10 }}>
          {hasSelected ? `已选 ${selectedRowKeys.length} 条` : ''}
        </span>
        <Table
          dataSource={Report}
          rowSelection={rowSelection}
          columns={columns}
        />
      </div>
    </>
  );
}

export default locationReport;
