import React, { useState } from 'react';
import { notification } from 'antd';
import { history } from 'umi';
import { login, register } from '@/api/api';

import styles from './index.less';
import sideLogo from '@/image/side.png';

// function Login() {
//   const [isActive, setIsActive] = useState(false);
//   const [loginData, setloginData] = useState({});
//   const [registerData, setregisterData] = useState({});
//   const change = () => {
//     setIsActive(!isActive);
//   };
//   const loginChange = (e: { target: { value: any; name: any } }) => {
//     const { value, name } = e.target;
//     const data = {
//       ...loginData,
//       [name]: value,
//     };
//     setloginData(data);
//   };
//   const registerChange = (e: { target: { value: any; name: any } }) => {
//     const { value, name } = e.target;
//     const data = {
//       ...registerData,
//       [name]: value,
//     };
//     setregisterData(data);
//   };
//   const toLogin = () => {
//     if (!loginData.username || !loginData.password) {
//       notification.error({
//         message: '注册失败',
//         description: '请输入用户名或密码！',
//         duration: 2,
//       });
//       return;
//     }

//     login(loginData).then((res: any) => {
//       if (res.flag === 'success') {
//         notification.success({
//           message: '登录成功',
//           description: res.message,
//           duration: 2,
//         });
//         localStorage.setItem('userToken', res.token);
//         localStorage.setItem('userId', res.userId);
//         localStorage.setItem('avatar_url', res.avatar_url);
//         localStorage.setItem('username', res.username);
//         history.push('/viperCode/home');
//       } else {
//         notification.error({
//           message: '登陆失败',
//           description: res.message,
//           duration: 2,
//         });
//       }
//     });
//   };

//   return (
//     <div className={styles.background}>
//       <div className={styles.side}>
//         <img src={sideLogo} />
//       </div>
//       <div className={styles.card}>
//         <div className={`${styles.cardFace} ${isActive ? styles.active : ''}`}>
//           <div className={styles.cardContent}>
//             <h2>登录</h2>
//             <input
//               placeholder="Username"
//               name="username"
//               onChange={loginChange}
//             />
//             <input
//               placeholder="Password"
//               type="password"
//               name="password"
//               onChange={loginChange}
//             />
//             <div className={styles.btnGroup}>
//               <button onClick={toLogin}>登录</button>
//             </div>
//           </div>
//         </div>
//         <div className={`${styles.cardFace} ${isActive ? '' : styles.active}`}>
//           <div className={styles.cardContent}>
//             <h2>注册</h2>
//             <input
//               placeholder="Username"
//               name="username"
//               onChange={registerChange}
//             />
//             <input
//               placeholder="Password"
//               name="password"
//               type="password"
//               onChange={registerChange}
//             />
//             <div className={styles.btnGroup}>
//               <button className={styles.changeBtn} onClick={change}>
//                 登录
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const NormalLoginForm = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
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
          rules={[{ required: true, message: '用户名' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>

        <div className={styles.cardContent}>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '密码' }]}
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
