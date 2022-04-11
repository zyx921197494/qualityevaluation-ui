import React, { useState } from 'react';
import LayoutWrap from '@/components/layoutWrap';
import styles from './index.less';
import { Button, Select, Form, Table, Upload, Divider } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

function locationReport(props) {
  const [file, setFile] = useState(null);
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

  const [selectedRowKeys, setselectedRowKeys] = useState<any>([]);
  const columns = [
    {
      title: '年份',
      dataIndex: 'year',
    },
    {
      title: '地区',
      dataIndex: 'location',
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

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  const onFinish = (values: any) => {
    console.log('Finish:', values);
  };

  const start = () => {
    //初始化
    setselectedRowKeys([]);
  };

  const onSelectChange = (value: any) => {
    setselectedRowKeys([...value]);
    console.log(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const data = [];

  for (let i = 0; i < 20; i++) {
    data.push({
      key: i,
      year: '000000000' + i,
      location: '000000000' + i,
      uploadTime: '000000000' + i,
    });
  }

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <LayoutWrap>
      <Divider orientation="left">查询区域报告</Divider>
      <div className={styles.area}>
        <Form layout="inline" onFinish={onFinish}>
          <Form.Item name="reportYear">
            <Select
              className={styles.select}
              placeholder="请选择报告年份"
              onChange={onChange}
            >
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
        <Form layout="inline" onFinish={onFinish}>
          <Form.Item name="year">
            <Select
              className={styles.select}
              placeholder="请选择上传年份"
              onChange={onChange}
            >
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
        <Button className={styles.btn} type={'primary'} htmlType="submit">
          下载
        </Button>
        <Button className={styles.btn} type={'primary'} htmlType="submit">
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
          dataSource={data}
          rowSelection={rowSelection}
          columns={columns}
        />
      </div>
    </LayoutWrap>
  );
}

export default locationReport;
