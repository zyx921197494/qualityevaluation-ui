import request from '../utils/request';

export async function getMyOwn(params: any) {
  return request(
    `/playground/getMyOwn?userId=${params}`,
    { method: 'get' },
    {},
  );
}
export async function sendModule(params: any) {
  return request('/playground/sendModule', { method: 'post' }, params);
}
export async function getModuleLists(params: any) {
  const url =
    params.type === 'search'
      ? `/playground/getModuleLists?userId=${params.userId}&&type=${params.type}&&value=${params.value}`
      : `/playground/getModuleLists?userId=${params.userId}&&type=${params.type}`;
  return request(url, { method: 'get' }, {});
}
export async function follow(params: any) {
  return request('/playground/follow', { method: 'post' }, params);
}
