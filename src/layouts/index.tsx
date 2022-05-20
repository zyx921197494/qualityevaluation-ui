import React, { useState } from 'react';
import { Layout, Menu, Button, message } from 'antd';
import { Switch, history } from 'umi';
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

function layoutWrap({ children, location }: any) {
  const toLogin = () => {
    localStorage.clear();
    message.success('成功退出系统');
    history.push('/');
  };

  const menuData = [
    {
      key: '/admin/account',
      icon: <TeamOutlined />,
      title: '评估账号管理',
      children: [
        {
          key: '/createAccount',
          title: '生成评估账号',
        },
        {
          key: '/exportAccount',
          title: '导出账号',
        },
        {
          key: '/resetEvaluation',
          title: '重启评估',
        },
      ],
    },
    {
      key: '/admin/data',
      icon: <DatabaseOutlined />,
      title: '基础数据',
      children: [
        {
          key: '/baseData',
          title: '学校信息管理',
        },
        {
          key: '/evaluationIndex',
          title: '评估指标管理',
        },
      ],
    },
    {
      key: '/admin/evaluation',
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
      key: '/admin/analysis',
      icon: <LineChartOutlined />,
      title: '评估数据分析',
      children: [
        {
          key: '/finishSituation',
          title: '年度完成情况',
        },
        {
          key: '/evaluateProcess',
          title: '区县评估进度',
        },
        {
          key: '/schoolScore',
          title: '学校得分情况',
        },
        {
          key: '/schoolScoreBySort',
          title: '分类统计得分',
        },
      ],
    },
    {
      key: '/admin/report',
      icon: <SnippetsOutlined />,
      title: '区域报告',
      children: [
        {
          key: '/locationReport',
          title: '区域报告管理',
        },
      ],
    },
    {
      key: '/admin/system',
      icon: <ApartmentOutlined />,
      title: '系统信息管理',
      children: [
        {
          key: '/ChangeAdminPassword',
          title: '修改密码',
        },
        {
          key: '/changeSchoolPassword',
          title: '更换学校密码',
        },
      ],
    },
    {
      key: '/admin/cycle',
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
  const handleClick = (e: { keyPath: any[]; key: any }) => {
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
          <span style={{ fontSize: 22 }}>中小学办学质量在线监测及评估系统</span>
          <span>
            <LogoutOutlined style={{ marginRight: 10 }} />
            <Button type="primary" size="large" onClick={toLogin}>
              退出
            </Button>
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
          <Switch location={location}>{children.props.children}</Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

export default layoutWrap;
