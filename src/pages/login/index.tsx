import React, { useState } from 'react';
import { notification } from 'antd';
import { history } from 'umi';
import { login } from '@/api/api';
import styles from './index.less';
import sideLogo from '@/image/side.png';

import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { data } from 'browserslist';

const NormalLoginForm = (props) => {
  let userType = '';

  const onFinish = (values: any) => {
    const key = 'updatable';
    message.loading({ content: 'Loading...', key });
    login({
      username: values.username,
      password: values.password,
    }).then((res) => {
      if (res.statusCode === 200) {
        message.success({ content: res.message, key });
        userType = res.data.token_type;
        if (res.data.token_type == 'user') {
          history.push('/user/userhome');
        } else if (res.data.token_type === 'admin') {
          history.push('/');
        }
      } else {
        message.error({ content: res.message, key });
      }
    });
  };

  return (
    <div className={styles.formWrap}>
      <Form
        name="normal_login"
        className={styles.formContent}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>

        <div className={styles.cardContent}>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
        </div>

        <Form.Item>
          <span className={styles.leftFormContent}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </span>
        </Form.Item>

        <Form.Item>
          <div className={styles.loginBtn}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NormalLoginForm;
