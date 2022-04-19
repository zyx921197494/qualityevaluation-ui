import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import styles from './index.less';
import {
  PageHeader,
  Button,
  Divider,
  Input,
  Table,
  message,
  Modal,
  Form,
  Select,
  Upload,
} from 'antd';
import {
  EditTwoTone,
  FundTwoTone,
  ContactsTwoTone,
  CheckCircleTwoTone,
  MailTwoTone,
  UploadOutlined,
  DownloadOutlined,
  CloseCircleTwoTone,
} from '@ant-design/icons';
import {
  getCurrentUser,
  getSchoolInfo,
  updateUserInfo,
  getTaskTime,
  sendEmail,
  isFirstLogin,
  startEvaluation,
  getCompleteIndex,
  uploadEvidence,
  finishEvaluation,
  downloadSelfReport,
  exportSelfEvaluation,
  exportEvidence,
  isFirstLoginSup,
  startEvaluationSup,
  getCompleteIndexSup,
  uploadEvidenceSup,
  finishEvaluationSup,
  exportSupEvaluation,
  exportEvidenceSup,
} from '@/api/api';

function userHome(props: any) {
  const [Role, setRole] = useState(0);
  useEffect(() => {
    const key = 'Loading...';
    const type = localStorage.getItem('token_type');
    if (type.split('_')[1] === 'self') {
      setRole(1);
      isFirstLogin().then((res: any) => {
        if (res.statusCode === 200) {
          if (res.data === true) {
            setConfirmVisible(true);
          }
        } else {
          message.error({ content: '获取登录信息失败' });
        }
      });
      getCompleteIndex().then((res: any) => {
        if (res.statusCode === 200) {
          console.log(res.data);
          setComplete(res.data);
        } else {
          message.error({ content: res.message });
        }
      });
    } else {
      setRole(2);
      isFirstLoginSup().then((res: any) => {
        if (res.statusCode === 200) {
          if (res.data === true) {
            setConfirmVisible(true);
          }
        } else {
          message.error({ content: '获取登录信息失败' });
        }
      });
      getCompleteIndexSup().then((res: any) => {
        if (res.statusCode === 200) {
          console.log(res.data);
          setComplete(res.data);
        } else {
          message.error({ content: res.message });
        }
      });
    }
  }, []);

  const typeOptions = [
    {
      label: '督评',
      value: '2',
    },
    {
      label: '县复评',
      value: '3',
    },
    {
      label: '市复评',
      value: '4',
    },
    {
      label: '省复评',
      value: '5',
    },
  ];

  // 任务周期
  const [Task, setTask] = useState({});
  useEffect(() => {
    getTaskTime().then((res: any) => {
      if (res.statusCode === 200) {
        const start = res.data.start.split('T');
        const end = res.data.end.split('T');
        setTask({
          start: start[0] + ' ' + start[1],
          end: end[0] + ' ' + end[1],
          close: res.data.close,
        });
        if (res.data.close) {
          setExportVisible(true);
        }
      }
    });
  }, []);

  // 首次登陆确认启动评估组件
  const [ConfirmVisible, setConfirmVisible] = useState(false);

  const onConfirm = () => {
    if (Role === 1) {
      startEvaluation().then((res: any) => {
        if (res.statusCode === 200) {
          setConfirmVisible(false);
          message.success({ content: res.message });
          getTaskTime().then((res: any) => {
            if (res.statusCode === 200) {
              const start = res.data.start.split('T');
              const end = res.data.end.split('T');
              setTask({
                start: start[0] + ' ' + start[1],
                end: end[0] + ' ' + end[1],
              });
            } else {
              message.error({ content: '获取任务周期失败' });
            }
          });
        } else {
          message.error({ content: res.message });
        }
      });
    } else {
      startEvaluationSup().then((res: any) => {
        if (res.statusCode === 200) {
          setConfirmVisible(false);
          message.success({ content: res.message });
          getTaskTime().then((res: any) => {
            if (res.statusCode === 200) {
              const start = res.data.start.split('T');
              const end = res.data.end.split('T');
              setTask({
                start: start[0] + ' ' + start[1],
                end: end[0] + ' ' + end[1],
              });
            } else {
              message.error({ content: '获取任务周期失败' });
            }
          });
        } else {
          message.error({ content: res.message });
        }
      });
    }
  };

  // 评估完成情况
  const sharedOnCell = (_, index) => {
    if (index === 4) {
      return { colSpan: 0 };
    }
  };

  const columns = [
    {
      title: '一级指标',
      dataIndex: 'index1Content',
      key: 'index1Content',
      align: 'center',
    },
    {
      title: '二级指标',
      dataIndex: 'index2Content',
      key: 'index2Content',
      align: 'center',
    },
    {
      title: '是否完成',
      dataIndex: 'isComplete',
      key: 'isComplete',
      align: 'center',
    },
  ];

  const [Complete, setComplete] = useState([]);

  // 个人信息组件
  const [UserInfoVisible, setUserInfoVisible] = useState(false);
  const [loading, setloading] = React.useState(false);
  const [User, setUser] = useState({});

  useEffect(() => {
    getCurrentUser().then((res: any) => {
      if (res.statusCode === 200) {
        setUser(res.data);
      } else {
        message.error({ content: res.message });
      }
    });
  }, []);

  const onUpdateUser = (values: any) => {
    setloading(true);
    updateUserInfo({
      userVo: {
        name: values.name,
        email: values.email,
      },
    }).then((res: any) => {
      if (res.statusCode === 200) {
        setloading(false);
        setUserInfoVisible(false);
        message.success({ content: res.message });
      } else {
        setloading(false);
        setUserInfoVisible(false);
        message.error({ content: res.message });
      }
    });
  };

  const handleCancel = () => {
    setUserInfoVisible(false);
    setSchoolInfoVisible(false);
    setFinishVisible(false);
  };

  const onUserInfo = () => {
    setUserInfoVisible(true);
  };

  // 学校信息组件
  const [SchoolInfoVisible, setSchoolInfoVisible] = useState(false);
  const [School, setSchool] = useState({});

  useEffect(() => {
    getSchoolInfo().then((res: any) => {
      if (res.statusCode === 200) {
        res.data.isGenerallyBeneficial =
          res.data.isGenerallyBeneficial === 1 ? '是' : '否';
        res.data.isCentral = res.data.isCentral === 1 ? '是' : '否';
        setSchool(res.data);
      } else {
        message.error({ content: res.message });
      }
    });
  }, []);

  const onSchoolInfo = () => {
    setSchoolInfoVisible(true);
  };

  // 跳转到评估页面
  const toEvaluate = () => {
    history.push('/user/userEvaluate');
  };

  // 完成评估组件
  const [FinishVisible, setFinishVisible] = useState(false);

  // 发送邮件
  const seneEmail = () => {
    const key = 'Loading...';
    message.loading({ content: key, key, duration: 0 });
    sendEmail({
      email: User.email,
    }).then((res: any) => {
      if (res.statusCode === 200) {
        message.success({ content: res.message, key });
      } else {
        message.error({ content: res.message, key });
      }
    });
  };

  // 完成自评
  const onFinishEvaluation = (values: any) => {
    const key = 'Loading...';
    message.loading({ content: key, key, duration: 0 });
    if (Role === 1) {
      finishEvaluation({
        code: values.code,
        email: User.email,
      }).then((res: any) => {
        if (res.statusCode === 200) {
          message.success({ content: res.message, key });
          setExportVisible(true);
        } else {
          message.error({ content: res.message, key });
        }
      });
    } else {
      finishEvaluationSup({
        code: values.code,
        email: User.email,
      }).then((res: any) => {
        if (res.statusCode === 200) {
          message.success({ content: res.message, key });
          setExportVisible(true);
        } else {
          message.error({ content: res.message, key });
        }
      });
    }
  };

  // 导出评估结果组件
  const [ExportVisible, setExportVisible] = useState(false);

  const onExportEvaluation = () => {
    if (Role === 1) {
      const key = 'Loading...';
      message.loading({ content: key, key, duration: 0 });
      exportSelfEvaluation({}).then((res: any) => {
        if (res.statusCode === 200) {
          message.success({ content: res.message, key });
        } else {
          message.error({ content: res.message, key });
        }
      });
    } else {
      const key = 'Loading...';
      message.loading({ content: key, key, duration: 0 });
      exportSupEvaluation({}).then((res: any) => {
        if (res.statusCode === 200) {
          message.success({ content: res.message, key });
        } else {
          message.error({ content: res.message, key });
        }
      });
    }
  };

  const onExportEvidence = () => {
    if (Role === 1) {
      const key = 'Loading...';
      message.loading({ content: key, key, duration: 0 });
      exportEvidence({}).then((res: any) => {
        if (res.statusCode === 200) {
          message.success({ content: res.message, key });
        } else {
          message.error({ content: res.message, key });
        }
      });
    } else {
      const key = 'Loading...';
      message.loading({ content: key, key, duration: 0 });
      exportEvidenceSup({}).then((res: any) => {
        if (res.statusCode === 200) {
          message.success({ content: res.message, key });
        } else {
          message.error({ content: res.message, key });
        }
      });
    }
  };

  const toLogin = () => {
    localStorage.clear();
    message.success('成功退出系统');
    history.push('/login');
  };

  // 下载意见书
  const onDownloadReport = (values: any) => {
    const key = 'Loading...';
    message.loading({ content: key, key, duration: 0 });
    downloadSelfReport({
      type: values.type,
    }).then((res: any) => {
      if (res.statusCode === 200) {
        message.success({ content: res.message, key });
      } else {
        message.error({ content: res.message, key });
      }
    });
  };

  return (
    <div>
      <Modal
        destroyOnClose={true}
        title="修改个人信息"
        visible={UserInfoVisible}
        footer={null}
        style={{ width: 500, height: 800 }}
        centered={true}
        closable={false}
      >
        <Form preserve={false} onFinish={onUpdateUser} initialValues={User}>
          <Form.Item name="id" label="编号">
            <Input disabled={true} />
          </Form.Item>
          <Form.Item name="name" label="姓名">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="邮箱">
            <Input />
          </Form.Item>
          <Form.Item className={styles.save}>
            <Button onClick={handleCancel}>取消</Button>
          </Form.Item>

          <Form.Item className={styles.save}>
            <Button type="primary" htmlType="submit" loading={loading}>
              保存
            </Button>
          </Form.Item>
          <Divider />
        </Form>
      </Modal>

      <Modal
        destroyOnClose={true}
        title="学校信息"
        visible={SchoolInfoVisible}
        footer={null}
        style={{ width: 500, height: 800 }}
        centered={true}
        closable={false}
      >
        <Form preserve={false} initialValues={School}>
          <Form.Item name="code" label="学校标识码">
            <Input disabled={true} />
          </Form.Item>
          <Form.Item name="location" label="学校地址">
            <Input disabled={true} />
          </Form.Item>
          <Form.Item name="locationTypeName" label="驻地城乡类型">
            <Input disabled={true} />
          </Form.Item>
          <Form.Item name="typeName" label="办学类型">
            <Input disabled={true} />
          </Form.Item>
          <Form.Item name="hostName" label="举办者类型">
            <Input disabled={true} />
          </Form.Item>

          <Form.Item className={styles.save}>
            <Button onClick={handleCancel}>关闭</Button>
          </Form.Item>
          <Divider />
        </Form>
      </Modal>

      <Modal
        destroyOnClose={true}
        title="确认启动评估"
        visible={ConfirmVisible}
        footer={null}
        style={{ width: 500, height: 800 }}
        centered={true}
        closable={false}
      >
        <Form preserve={false} onFinish={onConfirm}>
          <Form.Item name="text">
            <p>是否确认启动此次评估？</p>
          </Form.Item>
          <Form.Item className={styles.save}>
            <Button type="primary" htmlType="submit" loading={loading}>
              确认启动
            </Button>
          </Form.Item>
          <Divider />
        </Form>
      </Modal>

      <Modal
        destroyOnClose={true}
        title="完成评估"
        visible={FinishVisible}
        footer={null}
        style={{ width: 500, height: 800 }}
        centered={true}
        closable={false}
        width={400}
      >
        <Form preserve={false} onFinish={onFinishEvaluation}>
          <div className={styles.area}>
            <Form.Item name="code" className={styles.verifyCode}>
              <Input />
            </Form.Item>
            <Form.Item className={styles.save}>
              <Button shape="round" icon={<MailTwoTone />} onClick={seneEmail}>
                发送验证码
              </Button>
            </Form.Item>
          </div>
          <Form.Item className={styles.save}>
            <Button type="primary" htmlType="submit">
              完成评估
            </Button>
          </Form.Item>
          <Form.Item className={styles.save}>
            <Button onClick={handleCancel}>取消</Button>
          </Form.Item>
          <Divider />
        </Form>
      </Modal>

      <Modal
        destroyOnClose={true}
        title={School.name}
        visible={ExportVisible}
        footer={null}
        style={{ width: 500, height: 800 }}
        centered={true}
        closable={false}
        width={500}
      >
        <Form preserve={false}>
          <div className={styles.area}>
            <Form.Item>
              <Button
                className={styles.export}
                type="primary"
                onClick={onExportEvaluation}
              >
                导出评估结果
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                className={styles.export}
                type="primary"
                onClick={onExportEvidence}
              >
                导出评估证据
              </Button>
            </Form.Item>
          </div>
        </Form>

        <div>
          <Form>
            <Form.Item label="报告：" className={styles.upload}>
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>点击上传</Button>
              </Upload>
            </Form.Item>
          </Form>
        </div>

        <Form onFinish={onDownloadReport}>
          <div className={styles.area}>
            <Form.Item className={styles.select} label="意见书：" name="type">
              <Select
                placeholder="选择意见书类型"
                options={typeOptions}
              ></Select>
            </Form.Item>
            <Form.Item>
              <Button
                className={styles.download}
                type="primary"
                icon={<DownloadOutlined />}
                htmlType="submit"
              >
                下载
              </Button>
            </Form.Item>
          </div>
        </Form>

        <div className={styles.exit}>
          <Button type="primary" danger={true} onClick={toLogin}>
            退出系统
          </Button>
        </div>

        <Divider />
      </Modal>

      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          title="中小学办学质量在线监测及评估系统"
          extra={[
            <Button
              shape="round"
              htmlType="submit"
              icon={<FundTwoTone />}
              onClick={toEvaluate}
            >
              评估服务
            </Button>,
            <Button
              shape="round"
              htmlType="submit"
              icon={<EditTwoTone />}
              onClick={onSchoolInfo}
            >
              园所信息
            </Button>,
            <Button
              shape="round"
              htmlType="submit"
              icon={<ContactsTwoTone />}
              onClick={onUserInfo}
            >
              个人信息
            </Button>,
            <Button
              shape="round"
              icon={<CloseCircleTwoTone />}
              onClick={toLogin}
            >
              登出
            </Button>,
          ]}
        ></PageHeader>
        <Divider />
      </div>

      <div className={styles.card}>
        <div className={styles.input}>
          <p>学校名称：</p>
          <Input size="large" placeholder={School.name} disabled={true} />
        </div>
        <div className={styles.input}>
          <p>开始时间：</p>
          <Input size="large" placeholder={Task.start} disabled={true} />
        </div>
        <div className={styles.input}>
          <p>结束时间：</p>
          <Input size="large" placeholder={Task.end} disabled={true} />
        </div>
        <div className={styles.submit}>
          <Button
            size="large"
            shape="round"
            htmlType="submit"
            disabled={
              localStorage.getItem('token_type') === 'leader' ? false : true
            }
            icon={<CheckCircleTwoTone />}
            onClick={() => setFinishVisible(true)}
          >
            提交数据
          </Button>
        </div>
      </div>

      <Divider />
      <div className={styles.table}>
        <Table
          size="small"
          pagination={false}
          columns={columns}
          dataSource={Complete}
          bordered
        />
      </div>
    </div>
  );
}

export default userHome;
