import React, { useState } from 'react';
import styles from './index.less';
import {
  Button,
  Select,
  DatePicker,
  Input,
  Form,
  Table,
  Cascader,
  Tag,
  Divider,
} from 'antd';
import { BarChartOutlined, CloudDownloadOutlined } from '@ant-design/icons';

const { Option } = Select;

function evaluationData() {
  const [selectedRowKeys, setselectedRowKeys] = useState<any>([]);
  const columns = [
    {
      title: '标识码',
      dataIndex: 'schoolCode',
    },
    {
      title: '幼儿园名称',
      dataIndex: 'schoolName',
    },
    {
      title: '启动时间',
      dataIndex: 'startTime',
    },
    {
      title: '评估状态',
      dataIndex: 'taskStatus',
    },
    {
      title: '最后数据提交时间',
      dataIndex: 'lastSubmit',
    },
    {
      title: '操作',
      dataIndex: 'option',
    },
  ];

  const options = [
    {
      value: '重庆市',
      label: '重庆市',
      key: 'cq',
      children: [
        {
          value: '主城区',
          label: '主城区',
          children: [
            {
              value: '南岸区',
              label: '南岸区',
              children: [],
            },
            {
              value: '江北区',
              label: '江北区',
            },
          ],
        },
      ],
    },
    {
      value: '山西省',
      label: '山西省',
      children: [
        {
          value: '太原市',
          label: '太原市',
          children: [
            {
              value: '小店区',
              label: '小店区',
            },
          ],
        },
      ],
    },
  ];

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onSearch(val) {
    console.log('search:', val);
  }

  function filter(inputValue, path) {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
    );
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
      schoolCode: '000000000' + i,
      schoolName: '000000000' + i,
      startTime: '000000000' + i,
    });
  }
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
      <div className={styles.area}>
        <Form layout="inline" onFinish={onFinish}>
          <Form.Item name="location">
            <Cascader
              className={styles.selectLong}
              options={options}
              onChange={onChange}
              placeholder="省/市/区县"
              showSearch={{ filter }}
              onSearch={(value) => console.log(value)}
              changeOnSelect
            />
          </Form.Item>

          <Form.Item name="isGb">
            <Select
              className={styles.select}
              allowClear
              placeholder="是否普惠"
              onChange={onChange}
            >
              <Option key="1" value="">
                是
              </Option>
              <Option key="0" value="">
                否
              </Option>
            </Select>
          </Form.Item>

          <Form.Item name="isCity">
            <Select
              className={styles.select}
              allowClear
              placeholder="是否城市园"
              onChange={onChange}
            >
              <Option key="1" value="">
                是
              </Option>
              <Option key="0" value="">
                否
              </Option>
            </Select>
          </Form.Item>

          <Form.Item name="isPublic">
            <Select
              className={styles.select}
              allowClear
              placeholder="是否公办"
              onChange={onChange}
            >
              <Option key="1" value="">
                是
              </Option>
              <Option key="0" value="">
                否
              </Option>
            </Select>
          </Form.Item>

          <Form.Item name="taskType">
            <Select
              className={styles.select}
              allowClear={true}
              placeholder="请选择评估类型"
              onChange={onChange}
            >
              <Option key="1" value="1">
                自评
              </Option>
              <Option key="2" value="2">
                督评
              </Option>
            </Select>
          </Form.Item>

          <Form.Item name="taskStatus">
            <Select
              className={styles.select}
              allowClear={true}
              placeholder="请选择评估状态"
              onChange={onChange}
            >
              <Option key="1" value="1">
                未启动
              </Option>
              <Option key="2" value="2">
                评估中
              </Option>
              <Option key="3" value="3">
                评估数据已提交
              </Option>
              <Option key="4" value="4">
                报告已提交
              </Option>
              <Option key="5" value="5">
                报告审核不通过
              </Option>
              <Option key="6" value="6">
                报告审核通过
              </Option>
            </Select>
          </Form.Item>

          <Form.Item name="createTime">
            <DatePicker
              className={styles.select}
              placeholder="评估启动日期"
              format={'YYYY-MM-DD'}
            ></DatePicker>
          </Form.Item>

          <Form.Item name="schoolName">
            <Input className={styles.input} placeholder="请输入幼儿园名称" />
          </Form.Item>

          <Form.Item name="schoolCode">
            <Input className={styles.input} placeholder="请输入幼儿园标识码" />
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

      <div className={styles.audit}>
        <div>
          <Divider orientation="left">
            <Tag icon={<BarChartOutlined />} color="blue">
              评估数据
            </Tag>
          </Divider>
          <Button type={'primary'} htmlType="submit">
            导出选中结果
          </Button>
        </div>
        <div>
          <Divider orientation="left">
            <Tag icon={<CloudDownloadOutlined />} color="blue">
              报告文件
            </Tag>
          </Divider>
          <Button className={styles.btn} type={'primary'} htmlType="submit">
            下载报告文件
          </Button>
          <Button className={styles.btn} type={'primary'} htmlType="submit">
            审核通过
          </Button>
          <Button className={styles.btn} type={'primary'} htmlType="submit">
            审核不通过
          </Button>
        </div>
      </div>

      <div className={styles.between}>
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
    </>
  );
}

export default evaluationData;
