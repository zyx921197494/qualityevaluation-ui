import React, { useState } from 'react';
import styles from './index.less';
import { PageHeader, Button, Divider, Input, Table } from 'antd';
import {
  EditTwoTone,
  FundTwoTone,
  ContactsTwoTone,
  CheckCircleTwoTone,
} from '@ant-design/icons';

function userHome(props) {
  const sharedOnCell = (_, index) => {
    if (index === 4) {
      return { colSpan: 0 };
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, row, index) => <a>{text}</a>,
      onCell: (_, index) => ({
        // onCell设置单元格属性
        colSpan: index < 4 ? 1 : 5, // colSpan为0时不会渲染设置的表格
      }),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      onCell: sharedOnCell,
    },
    {
      title: 'Home phone',
      colSpan: 2, // 这个字段跨了表格同一行的2列
      dataIndex: 'tel',
      onCell: (_, index) => {
        if (index === 2) {
          return { rowSpan: 2 }; //同1列跨了2行
        }
        // These two are merged into above cell
        if (index === 3) {
          return { rowSpan: 0 };
        }
        if (index === 4) {
          return { colSpan: 0 };
        }
      },
    },
    {
      title: 'Phone',
      colSpan: 0,
      dataIndex: 'phone',
      onCell: sharedOnCell,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      onCell: sharedOnCell,
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      tel: '0571-22098909',
      phone: 18889898989,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      tel: '0571-22098333',
      phone: 18889898888,
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Jim Red',
      age: 18,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'London No. 2 Lake Park',
    },
    {
      key: '5',
      name: 'Jake White',
      age: 18,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'Dublin No. 2 Lake Park',
    },
  ];

  return (
    <div>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          title="中小学办学质量在线监测及评估系统"
          extra={[
            <Button shape="round" htmlType="submit" icon={<EditTwoTone />}>
              园所信息
            </Button>,
            <Button shape="round" htmlType="submit" icon={<FundTwoTone />}>
              评估服务
            </Button>,
            <Button shape="round" htmlType="submit" icon={<ContactsTwoTone />}>
              个人信息
            </Button>,
          ]}
        ></PageHeader>
        <Divider />
      </div>

      <div className={styles.card}>
        <div className={styles.input}>
          <p>幼儿园名称</p>
          <Input size="large" placeholder="xx幼儿园" disabled={true} />
        </div>
        <div className={styles.input}>
          <p>开始时间</p>
          <Input
            size="large"
            placeholder="2022年4月11日22:04:19"
            disabled={true}
          />
        </div>
        <div className={styles.input}>
          <p>结束时间</p>
          <Input
            size="large"
            placeholder="2022年4月11日22:04:27"
            disabled={true}
          />
        </div>
        <div className={styles.submit}>
          <Button
            size="large"
            shape="round"
            htmlType="submit"
            icon={<CheckCircleTwoTone />}
          >
            提交数据
          </Button>
        </div>
      </div>
      <Divider />
      <div>
        <Table columns={columns} dataSource={data} bordered />
      </div>
    </div>
  );
}

export default userHome;
