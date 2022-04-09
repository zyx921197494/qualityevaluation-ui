import request from '../utils/request';

export async function getTeamLists(params: any) {
  return request(`/team/getTeamLists?userId=${params}`, { method: 'get' }, {});
}
export async function createTeam(params: any) {
  return request('/team/createTeam', { method: 'post' }, params);
}

export async function getTeamData(params: any) {
  return request(`/team/getTeamData?teamId=${params}`, { method: 'get' }, {});
}

export async function updateTeamData(params: any) {
  return request('/team/updateTeamData', { method: 'post' }, params);
}

export async function addMember(params: any) {
  return request('/team/addMember', { method: 'post' }, params);
}

export async function joinTeam(params: any) {
  return request('/team/joinTeam', { method: 'post' }, params);
}

export async function exitMember(params: any) {
  return request('/team/deleteMember', { method: 'post' }, params);
}
