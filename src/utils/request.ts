import axios from 'axios';
import { history } from 'umi';
import { notification } from 'antd';

const base_url = 'http://localhost:8080';

const service = axios.create({
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 100000, // request timeout
});

// request interceptor
// service.interceptors.request.use(
//   (config) => {
//     // maybe should add with token
//     // "Bearer " + yourJWTToken
//     config.headers.common.Authorization =
//       'Bearer ' + localStorage.getItem('userToken');

//     return config;
//   },
//   (error) => {
//     // do something with request error
//     // console.log(error) // for debug
//     return Promise.reject(error);
//   },
// );
// // respone interceptors
// service.interceptors.response.use(
//   (response) => {
//     // 200 maybe has error
//     const { data = {} } = response;
//     if (data.code === 0) {
//       return data;
//     }
//     return data;
//   },
//   (err) => {
//     const { response = {} } = err;
//     if (err.response) {
//       if (err.response.status === 401) {
//         // 返回 401 清除token信息并跳转到登录页面
//         // history.push({
//         //   pathname: '/login',
//         // });
//         // notification.error({
//         //   message: '请求错误',
//         //   description: '用户没有权限（令牌、用户名、密码错误），请重新登陆',
//         // });
//       }
//     }
//     return Promise.resolve(response.data);
//   },
// );

const request = (url: string, options: any, data: any) => {
  const requestParams = {
    url: base_url + url,
    method: options.method || 'get',
    headers: {
      Accept: '*/*',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    data: data || {},
  };
  // if (requestParams.method === 'get') {
  //   requestParams.data = JSON.stringify(requestParams.data);
  // }
  // console.log('send==>', requestParams);
  return new Promise((resolve, reject) => {
    service(requestParams)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default request;
