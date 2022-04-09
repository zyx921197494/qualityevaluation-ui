import request from '../utils/request';

export async function getProjectLists(params: any) {
  return request(
    `/project/getProjectLists?userId=${params}`,
    { method: 'get' },
    {},
  );
}
export async function createProject(params: any) {
  return request('/project/createProject', { method: 'post' }, params);
}

export async function getProject(params: any) {
  return request(
    `/project/getProject?projectId=${params}`,
    { method: 'get' },
    {},
  );
}

export async function updateProject(params: any) {
  return request('/project/updateProject', { method: 'post' }, params);
}

export async function createModule(params: any) {
  return request('/project/createModule', { method: 'post' }, params);
}

export async function deleteModule(params: any) {
  return request('/project/deleteModule', { method: 'post' }, params);
}

export async function setModule(params: any) {
  return request('/project/setModule', { method: 'post' }, params);
}

export async function getSchema(params: any) {
  return request(
    `/project/getSchema?module_id=${params}`,
    { method: 'get' },
    {},
  );
}

export async function saveSchema(params: any) {
  return request('/project/saveSchema', { method: 'post' }, params);
}
