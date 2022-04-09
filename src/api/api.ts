import request from '../utils/request';

export async function login(params: any) {
  return request('/login', { method: 'post' }, params);
}

export async function register(params: any) {
  return request('/register', { method: 'post' }, params);
}

export async function updatePersonData(params: any) {
  return request('/person/updatePersonData', { method: 'post' }, params);
}

export async function getPersonData(params: any) {
  return request(`/person/getPersonData?id=${params}`, { method: 'get' }, {});
}
