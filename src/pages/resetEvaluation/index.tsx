import React, { useState } from 'react';
import LayoutWrap from '@/components/layoutWrap';
import styles from './index.less';
import { Button, Select, DatePicker, Input, Form, Table } from 'antd';

const { Option } = Select;

function ResetEvaluation() {
  const [selectedRowKeys, setselectedRowKeys] = useState<any>([]);
  const columns = [
    {
      title: '标识码',
      dataIndex: 'schoolCode',
    },
    {
      title: '省/直辖市',
      dataIndex: 'province',
    },
    {
      title: '区县',
      dataIndex: 'county',
    },
    {
      title: '幼儿园名称',
      dataIndex: 'schoolName',
    },
    {
      title: '地址',
      dataIndex: 'schoolLocation',
    },
    {
      title: '账号创建时间',
      dataIndex: 'createTime',
    },
  ];

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onSearch(val) {
    console.log('search:', val);
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
      province: '000000000' + i,
      county: '000000000' + i,
      schoolName: '000000000' + i,
      schoolLocation: '000000000' + i,
      createTime: '000000000' + i,
    });
  }
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <LayoutWrap>
      <div className={styles.area}>
        <Form layout="inline" onFinish={onFinish}>
          <Form.Item name="location">
            <Select
              style={{ width: 200 }}
              allowClear={true}
              showSearch
              placeholder="请选择区域/输入关键字"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option key="1" value="1">
                重庆市
              </Option>
              <Option key="2" value="2">
                山西省
              </Option>
              <Option key="3" value="3">
                北京市
              </Option>
            </Select>
          </Form.Item>

          <Form.Item name="createTime">
            <DatePicker
              placeholder="账号创建时间"
              format={'YYYY-MM-DD'}
            ></DatePicker>
          </Form.Item>

          <Form.Item name="schoolName">
            <Input placeholder="请输入幼儿园名称" />
          </Form.Item>

          <Form.Item>
            <Button type={'primary'} htmlType="submit">
              查询
            </Button>
          </Form.Item>
          <Form.Item>
            <Button htmlType="reset">重置搜索条件</Button>
          </Form.Item>
        </Form>
      </div>

      <div className={styles.area2}>
        <Button type={'primary'} htmlType="submit">
          重启自评
        </Button>
        <Button type={'primary'} htmlType="submit">
          重启督评
        </Button>
        <Button type={'primary'} htmlType="submit">
          重启县复评
        </Button>
        <Button type={'primary'} htmlType="submit">
          重启市复评
        </Button>
        <Button type={'primary'} htmlType="submit">
          重启省复评
        </Button>
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
        <span style={{ marginLeft: 8 }}>
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

export default ResetEvaluation;
