import React, { useState } from 'react';
import styles from './index.less';
import { Button, Form, Table, Input, Divider, Select } from 'antd';

function StartCycle(props) {
  const [selectedRowKeys, setselectedRowKeys] = useState<any>([]);
  const columns = [
    {
      title: '区县',
      dataIndex: 'county',
    },
    {
      title: '当前周期',
      dataIndex: 'currentCycle',
    },
  ];

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
      county: '000000000' + i,
      currentCycle: '000000000' + i,
    });
  }

  const onFinish = (values: any) => {
    console.log(values);
  };

  const options = [
    {
      key: 1,
      value: '评价体系1',
    },
    {
      key: 2,
      value: '评价体系2',
    },
  ];

  return (
    <>
      <div>
        <div>
          <Form
            className={styles.area}
            name="startCycleForm"
            onFinish={onFinish}
          >
            <Form.Item name="evaluateIndexId">
              <Select
                className={styles.select}
                allowClear
                placeholder="选择评价体系"
                options={options}
              />
            </Form.Item>

            <Form.Item>
              <div>
                <Button type="primary" htmlType="submit" className={styles.btn}>
                  允许启动新一周期
                </Button>
              </div>
            </Form.Item>
          </Form>
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

export default StartCycle;
