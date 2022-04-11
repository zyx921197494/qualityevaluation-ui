import React, { useState } from 'react';
import LayoutWrap from '@/components/layoutWrap';
import styles from './index.less';
import { Button, Form, Table, Input, Divider } from 'antd';

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
      county: '000000000' + i,
      currentCycle: '000000000' + i,
    });
  }

  return (
    <LayoutWrap>
      <div>
        <div>
          <Button className={styles.btn} type="primary" htmlType="submit">
            允许启动新一周期
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
    </LayoutWrap>
  );
}

export default StartCycle;
