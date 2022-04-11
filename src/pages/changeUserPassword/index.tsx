import React, { useState } from 'react';
import LayoutWrap from '@/components/layoutWrap';
import styles from './index.less';
import { Button, Input, Form } from 'antd';

function ChangeUserPassword(props) {
  const onFinish = (values: any) => {
    console.log('Finish:', values);
  };

  return (
    <LayoutWrap>
      <div className={styles.area}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="oldPassword">
            旧密码：
            <Input placeholder="旧密码" />
          </Form.Item>

          <Form.Item name="newPassword">
            新密码：
            <Input placeholder="新密码" />
          </Form.Item>

          <Form.Item name="comfirmNewPassword">
            确认新密码：
            <Input placeholder="确认新密码" />
          </Form.Item>

          <Form.Item>
            <Button className={styles.btn} type={'primary'} htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </LayoutWrap>
  );
}

export default ChangeUserPassword;
