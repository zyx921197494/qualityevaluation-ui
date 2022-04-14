import request from '../utils/request';

//登录
export async function login(params: any) {
  return request('/auth/login', { method: 'post' }, params);
}

//生成在册园账号
export async function createRegisterUsers(params: any) {
  return request('/admin/createRegisterUsers', { method: 'post' }, params);
}

// 查找幼儿园
export async function schools(params: any) {
  return request(
    `/admin/schools?keyName=${params.keyName}&locationCode=${params.locationCode}&current=${params.current}&pageSize=${params.pageSize}`,
    { method: 'get' },
    {},
  );
}

// 查找下一级行政区
export async function region(params: any) {
  return request(
    `/universal/region/${params.locationCode}`,
    { method: 'get' },
    {},
  );
}

// 导出评估账号
export async function exportUser(params: any) {
  return request(
    `/admin/exportUser?authorityId=${params.authorityId}`,
    { method: 'post' },
    params.schoolCodes,
  );
}

export async function register(params: any) {
  return request('/register', { method: 'post' }, params);
}

export async function updatePersonData(params: any) {
  return request('/person/updatePersonData', { method: 'post' }, params);
}

export async function getPersonData(params: any) {
  return request(
    `/person/getPersonData?id=${params.id}`,
    { method: 'get' },
    {},
  );
}
