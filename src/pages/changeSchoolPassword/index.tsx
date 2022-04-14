import React, { useState } from 'react';
import styles from './index.less';
import { Button, Form, Table, Input, Divider } from 'antd';

function ChangeSchoolPassword(props) {
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
  ];

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

  const hasSelected = selectedRowKeys.length > 0;
  const data = [];

  for (let i = 0; i < 20; i++) {
    data.push({
      key: i,
      province: '000000000' + i,
      county: '000000000' + i,
      schoolName: '000000000' + i,
      schoolLocation: '000000000' + i,
    });
  }

  return (
    <>
      <div className={styles.area}>
        <Form layout="inline" onFinish={onFinish}>
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

      <Divider orientation="left"></Divider>

      <div>
        <div>
          <Button className={styles.btn} type="primary" htmlType="submit">
            更换自评密码
          </Button>
          <Button className={styles.btn} type="primary" htmlType="submit">
            更换自评密码
          </Button>
          <Button className={styles.btn} type="primary" htmlType="submit">
            更换自评密码
          </Button>
        </div>

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

export default ChangeSchoolPassword;
