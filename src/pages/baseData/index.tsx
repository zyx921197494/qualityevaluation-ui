import React, { useState } from 'react';
import LayoutWrap from '@/components/layoutWrap';
import styles from './index.less';
import {
  Button,
  Select,
  DatePicker,
  Input,
  Form,
  Table,
  Cascader,
  Radio,
  Space,
} from 'antd';

const { Option } = Select;

function BaseData() {
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
    },
    {
      title: '标识码',
      dataIndex: 'schoolCode',
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
      title: '操作',
      dataIndex: 'option',
    },
  ];

  const options = [
    {
      value: '重庆市',
      label: '重庆市',
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

  function onChange(value, selectedOptions) {
    console.log(value);
  }

  function filter(inputValue, path) {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
    );
  }

  function onSearch(val) {
    console.log('search:', val);
  }

  const onFinish = (values: any) => {
    console.log('Finish:', values);
  };

  return (
    <LayoutWrap>
      <div className={styles.area}>
        <Form layout="inline" onFinish={onFinish}>
          <Form.Item name="location">
            <Cascader
              className={styles.select}
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

          <Form.Item name="schoolName">
            <Input className={styles.input} placeholder="幼儿园名称/关键字" />
          </Form.Item>

          <Form.Item name="schoolName">
            <Input className={styles.input} placeholder="幼儿园名称标识码" />
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

      <div className={styles.area}>
        <Form layout="inline" onFinish={onFinish}>
          <Form.Item>
            <Select
              className={styles.select}
              allowClear
              placeholder="要转入的区县"
              onChange={onChange}
            >
              <Option key="1" value="1">
                县1
              </Option>
              <Option key="2" value="2">
                县2
              </Option>
              <Option key="3" value="3">
                县3
              </Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              className={styles.resetCondition}
              type={'primary'}
              htmlType="submit"
            >
              修改归属地
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className={styles.between}>
        <Button className={styles.between} type="primary">
          重置选择
        </Button>
        <Table columns={columns} />
      </div>
    </LayoutWrap>
  );
}

export default BaseData;
