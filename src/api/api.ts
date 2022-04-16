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
    `/admin/schools?schoolCode=${params.schoolCode}&locationCode=${params.locationCode}&isCity=${params.isCity}&isPublic=${params.isPublic}&isGB=${params.isGB}&keyName=${params.keyName}&keyLocation=${params.keyLocation}&current=${params.current}&pageSize=${params.pageSize}`,
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

// 重启评估
export async function resetEvaluation(params: any) {
  return request(
    `/admin/resetEvaluation?type=${params.type}`,
    { method: 'post' },
    params.schoolCodeList,
  );
}

// 修改学校归属地
export async function changeSchoolLocation(params: any) {
  return request(
    `/admin/changeSchoolLocation?locationCode=${params.locationCode}`,
    { method: 'post' },
    params.schoolCodes,
  );
}

// // 查看学校信息
// export async function schoolInfo(params: any) {
//   return request(
//     `/universal/schoolInfo?schoolCode=${params.schoolCode}`,
//     { method: 'get' },
//     {},
//   );
// }

// 修改学校信息
export async function updateSchool(params: any) {
  return request(`/admin/updateSchool`, { method: 'post' }, params);
}

// 查找幼儿园评估任务
export async function schoolTask(params: any) {
  return request(`/admin/schoolTask`, { method: 'post' }, params);
}

// 导出评估数据
export async function exportEvaluationData(params: any) {
  return request(
    `/admin/exportEvaluationData?taskType=${params.taskType}`,
    { method: 'post' },
    params.schools,
  );
}

// 下载评估报告
export async function downloadReport(params: any) {
  return request(
    `/admin/downloadReport?type=${params.type}`,
    { method: 'post' },
    params.schoolCodes,
  );
}

// 审核评估报告
export async function auditReport(params: any) {
  return request(
    `/admin/auditReport?type=${params.type}&isAccept=${params.isAccept}`,
    { method: 'post' },
    params.schoolCodes,
  );
}

// 管理员查看本区域内各年份区域报告
export async function listLocationReport(params: any) {
  return request(
    `/admin/listLocationReport?year=${params.year}`,
    { method: 'get' },
    {},
  );
}

// 管理员上传本地区某一年的区域报告
export async function uploadLocationReport(params: any) {
  return request(
    `/admin/uploadLocationReport?year=${params.year}&file=${params.file}`,
    { method: 'get' },
    {},
  );
}

// 管理员根据区域报告id批量下载报告
export async function downloadLocationReport(params: any) {
  return request(
    `/admin/downloadLocationReport`,
    { method: 'post' },
    params.ids,
  );
}

// 管理员根据区域报告id批量删除报告
export async function deleteLocationReport(params: any) {
  return request(`/admin/deleteLocationReport`, { method: 'post' }, params.ids);
}

// 管理员修改密码
export async function changeAdminPassword(params: any) {
  return request(
    `/admin/changeAdminPassword`,
    { method: 'post' },
    params.newPwd,
  );
}

// 管理员修改学校评估密码
export async function changeUserPassword(params: any) {
  return request(
    `/admin/changeUserPassword?authorityId=${params.authorityId}`,
    { method: 'post' },
    params.schoolCodes,
  );
}

// 根据行政区码获取下属各县的当前周期
export async function getCycle(params: any) {
  return request(
    `/admin/getCycle?locationCode=${params.locationCode}`,
    { method: 'get' },
    {},
  );
}

// 获取所有评价体系
export async function getIndex() {
  return request(`/admin/getIndex`, { method: 'get' }, {});
}

// 开启新一周期
export async function startCycle(params: any) {
  return request(
    `/admin/startCycle?evaluateIndexId=${params.evaluateIndexId}`,
    { method: 'post' },
    params.locationCodes,
  );
}
