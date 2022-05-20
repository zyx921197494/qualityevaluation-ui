import React, { useState } from 'react';
import { history } from 'umi';
import styles from './index.less';
import { changeAdminPassword } from '@/api/api';
import { Button, Input, Form, message } from 'antd';

function ChangeAdminPassword(props) {
  const key = 'loading';
  const onFinish = (values: any) => {
    if (
      values.newPwd === '' ||
      values.newPwd === undefined ||
      values.comfirmPwd === '' ||
      values.comfirmPwd === undefined
    ) {
      message.warning({ content: '密码不能为空', key });
      return;
    }
    if (values.newPwd != values.comfirmPwd) {
      message.warning({ content: '两次输入的新密码不一致！', key });
      return;
    }
    changeAdminPassword({
      newPwd: [values.newPwd],
    }).then((res: any) => {
      if (res.statusCode === 200) {
        message.success({ content: res.message + '，请重新登陆', key });
        history.push('/');
      } else {
        message.error({ content: res.message, key });
      }
    });
  };

  return (
    <>
      <div className={styles.area}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="newPwd" label="新密码:">
            <Input autoComplete="false" type="password" placeholder="新密码" />
          </Form.Item>

          <Form.Item name="comfirmPwd" label="确认新密码:">
            <Input
              autoComplete="false"
              type="password"
              placeholder="确认新密码"
            />
          </Form.Item>

          <Form.Item>
            <Button className={styles.btn} type={'primary'} htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default ChangeAdminPassword;
