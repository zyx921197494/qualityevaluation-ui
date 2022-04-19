import request from '../utils/request';
import fileRequest from '../utils/fileRequest';

//登录
export async function login(params: any) {
  return request('/auth/login', { method: 'post' }, params);
}

//生成在册园账号
export async function createRegisterUsers(params: any) {
  return fileRequest(
    '/admin/createRegisterUsers',
    { method: 'post' },
    params.file,
  );
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

// 查找任务周期
export async function getTaskTime() {
  return request(`/evaluate/common/getTaskTime`, { method: 'get' }, {});
}

// 评估人员修改用户信息
export async function getCurrentUser() {
  return request(`/evaluate/common/getCurrentUser`, { method: 'get' }, {});
}

// 修改人员修改用户信息
export async function updateUserInfo(params: any) {
  return request(
    `/evaluate/common/updateUserInfo`,
    { method: 'post' },
    params.userVo,
  );
}

// 查询学校信息
export async function getSchoolInfo() {
  return request(`/evaluate/common/getSchoolInfo`, { method: 'get' }, {});
}

// 获取当前用户的类型
export async function currentRole() {
  return request(`/universal/currentRole`, { method: 'get' }, {});
}

// 发送邮箱验证码
export async function sendEmail(params: any) {
  return request(
    `/evaluate/common/sendEmail?email=${params.email}`,
    { method: 'get' },
    {},
  );
}

// ————————————————————————————自评模块——————————————————————————————————
// 园长是否是第一次登录
export async function isFirstLogin() {
  return request(`/evaluate/self/isFirstLogin`, { method: 'get' }, {});
}

// 园长启动自评
export async function startEvaluation() {
  return request(`/evaluate/self/startEvaluation`, { method: 'get' }, {});
}

// 查询自评完成情况
export async function getCompleteIndex() {
  return request(`/evaluate/self/getCompleteIndex`, { method: 'get' }, {});
}

// 查询已提交的自评数据
export async function getSubmittedEvaluation() {
  return request(
    `/evaluate/self/getSubmittedEvaluation`,
    { method: 'get' },
    {},
  );
}

// 提交自评数据
export async function submitEvaluation(params: any) {
  return request(
    `/evaluate/self/submitEvaluation`,
    { method: 'post' },
    params.submitVos,
  );
}

// 提交自评证据
export async function uploadEvidence(params: any) {
  return request(
    `/evaluate/self/uploadEvidence`,
    { method: 'post' },
    params.file,
  );
}

// 完成自评
export async function finishEvaluation(params: any) {
  return request(
    `/evaluate/self/finishEvaluation?email=${params.email}&code=${params.code}`,
    { method: 'get' },
    {},
  );
}

// 导出自评数据
export async function exportSelfEvaluation(params: any) {
  return request(`/evaluate/self/exportEvaluation`, { method: 'get' }, {});
}

// 导出自评证据
export async function exportEvidence(params: any) {
  return request(`/evaluate/self/exportEvidence`, { method: 'get' }, {});
}

// 上传自评报告
export async function uploadSelfReport(params: any) {
  return request(
    `/evaluate/self/uploadSelfReport`,
    { method: 'post' },
    params.file,
  );
}

// 下载督评/复评报告
export async function downloadSelfReport(params: any) {
  return request(
    `/evaluate/self/downloadReport?type=${params.type}`,
    { method: 'get' },
    {},
  );
}

// ——————————————————————————督评模块————————————————————————
// 是否是第一次登录
export async function isFirstLoginSup() {
  return request(`/evaluate/supervise/isFirstLogin`, { method: 'get' }, {});
}

// 启动督评
export async function startEvaluationSup() {
  return request(`/evaluate/supervise/startEvaluation`, { method: 'get' }, {});
}

// 查询督评完成情况
export async function getCompleteIndexSup() {
  return request(`/evaluate/supervise/getCompleteIndex`, { method: 'get' }, {});
}

// 查询已提交的督评数据
export async function getSubmittedEvaluationSup() {
  return request(
    `/evaluate/supervise/getSubmittedEvaluation`,
    { method: 'get' },
    {},
  );
}

// 提交督评数据
export async function submitEvaluationSup(params: any) {
  return request(
    `/evaluate/supervise/submitEvaluation`,
    { method: 'post' },
    params.submitVos,
  );
}

// 提交督评证据
export async function uploadEvidenceSup(params: any) {
  return request(
    `/evaluate/supervise/uploadEvidence`,
    { method: 'post' },
    params.file,
  );
}

// 完成督评
export async function finishEvaluationSup(params: any) {
  return request(
    `/evaluate/supervise/finishEvaluation?email=${params.email}&code=${params.code}`,
    { method: 'get' },
    {},
  );
}

// 导出督评数据
export async function exportSupEvaluation(params: any) {
  return request(`/evaluate/supervise/exportEvaluation`, { method: 'get' }, {});
}

// 导出督评证据
export async function exportEvidenceSup(params: any) {
  return request(`/evaluate/supervise/exportEvidence`, { method: 'get' }, {});
}

// 上传督评报告
export async function uploadSuperviseReport(params: any) {
  return request(
    `/evaluate/supervise/uploadSuperviseReport`,
    { method: 'post' },
    params.file,
  );
}
// ——————————————————————————Analysis模块————————————————————————
// 获取下属区域中每年完成自评和督评的学校数量
export async function finishResult() {
  return request(`/admin/analysis/finishSituation`, { method: 'get' }, {});
}

// 区县评估进度查询
export async function evaluateCountyProcess(params: any) {
  return request(
    `/admin/analysis/evaluateCountyProcess?countyCode=${params.countyCode}`,
    { method: 'get' },
    {},
  );
}

// 区县内所有学校自评各项指标均分及总分均值
export async function getCountyScore(params: any) {
  return request(
    `/admin/analysis/getCountyScore?countyCode=${params.countyCode}`,
    { method: 'get' },
    {},
  );
}

// 区县内不同任务各学校各项指标数值及总分
export async function getSchoolScore(params: any) {
  return request(
    `/admin/analysis/getSchoolScore?taskType=${params.taskType}&countyCode=${params.countyCode}`,
    { method: 'get' },
    {},
  );
}

// 根据学校类型查询总分均值和各一级指标均值
export async function getScoreBySort(params: any) {
  return request(
    `/admin/analysis/getScoreBySort`,
    { method: 'post' },
    params.scoreDTO,
  );
}
