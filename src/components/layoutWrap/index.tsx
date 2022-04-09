import React, { Children, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownloadOutlined,
  DatabaseOutlined,
  ApartmentOutlined,
  TeamOutlined,
  HomeOutlined,
  LineChartOutlined,
  SnippetsOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import styles from './index.less';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

function layoutWrap(props: any) {
  const menuData = [
    {
      key: '1',
      icon: <TeamOutlined />,
      title: '评估账号管理',
      children: [
        {
          key: 's1',
          title: '生成在册园账号',
        },
        {
          key: 's2',
          title: '导出与删除账号',
        },
        {
          key: 's3',
          title: '重启评估',
        },
      ],
    },
    {
      key: '2',
      icon: <DatabaseOutlined />,
      title: '基础数据',
      children: [],
    },
    {
      key: '3',
      icon: <DownloadOutlined />,
      title: '评估数据管理',
      children: [],
    },
    {
      key: '4',
      icon: <LineChartOutlined />,
      title: '评估数据检测与分析',
      children: [],
    },
    {
      key: '5',
      icon: <SnippetsOutlined />,
      title: '区域报告',
      children: [],
    },
    {
      key: '6',
      icon: <ApartmentOutlined />,
      title: '系统信息管理',
      children: [],
    },
  ];
  const [collapsed, setcollapsed] = useState(false);

  const toggle = () => {
    setcollapsed(!collapsed);
  };
  return (
    <Layout className={styles.layout}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={styles.side}
      >
        {collapsed ? (
          <div className={styles.logo}>
            <HomeOutlined style={{ marginRight: 10 }} />
          </div>
        ) : (
          <div className={styles.logo}>
            <HomeOutlined style={{ marginRight: 10 }} />
            首页
          </div>
        )}
        <Menu theme="dark" mode="inline">
          {menuData.map((item: any) => {
            return (
              <SubMenu key={item.key} title={item.title} icon={item.icon}>
                {item.children
                  ? item.children.map((item: any) => {
                      return <Menu.Item key={item.key}>{item.title}</Menu.Item>;
                    })
                  : null}
              </SubMenu>
            );
          })}
        </Menu>
      </Sider>
      <Layout>
        <Header className={styles.header}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              onClick: toggle,
            },
          )}
          <span style={{ fontSize: 22 }}>教育部幼儿园办园行为督导评估系统</span>
          <span>
            <LogoutOutlined style={{ marginRight: 10 }} />
            退出
          </span>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default layoutWrap;
