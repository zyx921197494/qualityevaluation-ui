import React, { Children, useState } from 'react';
import { Layout, Menu } from 'antd';
import { history } from 'umi';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FileTextFilled,
  DatabaseOutlined,
  ApartmentOutlined,
  TeamOutlined,
  HomeOutlined,
  LineChartOutlined,
  SnippetsOutlined,
  LogoutOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import styles from './index.less';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

function layoutWrap(props: any) {
  const menuData = [
    {
      key: '/account',
      icon: <TeamOutlined />,
      title: '评估账号管理',
      children: [
        {
          key: '/createAccount',
          title: '生成在册园账号',
        },
        {
          key: '/exportAccount',
          title: '导出与删除账号',
        },
        {
          key: '/resetEvaluation',
          title: '重启评估',
        },
      ],
    },
    {
      key: '/data',
      icon: <DatabaseOutlined />,
      title: '基础数据',
      children: [
        {
          key: '/baseData',
          title: '幼儿园信息管理',
        },
      ],
    },
    {
      key: '/evaluation',
      icon: <FileTextFilled />,
      title: '评估数据管理',
      children: [
        {
          key: '/evaluationData',
          title: '数据管理',
        },
      ],
    },
    {
      key: '/analysis',
      icon: <LineChartOutlined />,
      title: '评估数据检测与分析',
      children: [
        {
          key: 's6',
          title: '年度完成情况',
        },
        {
          key: 's7',
          title: '各省/各市/各区县评估进度',
        },
        {
          key: 's8',
          title: '区县评估进度查询',
        },
        {
          key: 's9',
          title: '各省/各市/各区得分',
        },
        {
          key: 's10',
          title: '区县幼儿园得分',
        },
        {
          key: 's11',
          title: '城市园和农村园得分',
        },
        {
          key: 's12',
          title: '公办园和民办园得分',
        },
        {
          key: 's13',
          title: '普惠园和非普惠园得分',
        },
      ],
    },
    {
      key: '/report',
      icon: <SnippetsOutlined />,
      title: '区域报告',
      children: [
        {
          key: '/locationReport',
          title: '区域报告',
        },
      ],
    },
    {
      key: '/system',
      icon: <ApartmentOutlined />,
      title: '系统信息管理',
      children: [
        {
          key: '/changeUserPassword',
          title: '修改密码',
        },
        {
          key: '/changeSchoolPassword',
          title: '更换幼儿园密码',
        },
      ],
    },
    {
      key: '/cycle',
      icon: <ScheduleOutlined />,
      title: '周期管理',
      children: [
        {
          key: '/startCycle',
          title: '允许启动下一周期',
        },
      ],
    },
  ];
  const [collapsed, setcollapsed] = useState(false);
  const { pathname } = history.location;
  const arr = pathname.split('/');
  const toggle = () => {
    setcollapsed(!collapsed);
  };
  const handleClick = (e) => {
    history.push({
      pathname: e.keyPath[1] + e.key,
    });
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
        <Menu
          theme="dark"
          mode="inline"
          onClick={handleClick}
          defaultSelectedKeys={[`/${arr[2]}`]}
          defaultOpenKeys={[`/${arr[1]}`]}
        >
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
