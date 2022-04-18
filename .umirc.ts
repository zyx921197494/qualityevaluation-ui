import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/login',
      component: '@/pages/login/index.tsx',
      exact: true,
      title: '登录',
    },
    {
      path: '/user/userHome',
      component: '@/pages/userHome/index.tsx',
      exact: true,
      title: '用户页',
    },
    {
      path: '/user/userEvaluate',
      component: '@/pages/userEvaluate/index.tsx',
      exact: true,
      title: '用户页',
    },
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/home',
          component: '@/pages/home/index.tsx',
          exact: true,
          title: 'home',
        },
        {
          path: '/test',
          component: '@/pages/test/index.tsx',
          exact: true,
          title: 'test',
        },
        {
          path: '/account/createAccount',
          component: '@/pages/createAccount/index.tsx',
          exact: true,
          title: '生成账号',
        },
        {
          path: '/account/exportAccount',
          component: '@/pages/exportAccount/index.tsx',
          exact: true,
          title: '导出账号',
        },
        {
          path: '/account/resetEvaluation',
          component: '@/pages/resetEvaluation/index.tsx',
          exact: true,
          title: '重启评估',
        },
        {
          path: '/data/baseData',
          component: '@/pages/baseData/index.tsx',
          exact: true,
          title: '基础数据',
        },
        {
          path: '/evaluation/evaluationData',
          component: '@/pages/evaluationData/index.tsx',
          exact: true,
          title: '基础数据',
        },
        {
          path: '/report/locationReport',
          component: '@/pages/locationReport/index.tsx',
          exact: true,
          title: '区域报告',
        },
        {
          path: '/system/ChangeAdminPassword',
          component: '@/pages/ChangeAdminPassword/index.tsx',
          exact: true,
          title: '修改用户密码',
        },
        {
          path: '/system/changeSchoolPassword',
          component: '@/pages/changeSchoolPassword/index.tsx',
          exact: true,
          title: '修改幼儿园密码',
        },
        {
          path: '/cycle/startCycle',
          component: '@/pages/startCycle/index.tsx',
          exact: true,
          title: '周期管理',
        },
        {
          path: '/analysis/finishSituation',
          component: '@/pages/analysis/finishSituation/index.tsx',
          exact: true,
          title: '年度完成情况',
        },
      ],
    },
  ],
  fastRefresh: {},
  dva: {
    immer: true,
    hmr: true,
    disableModelsReExport: true,
    lazyLoad: true,
  },
  mfsu: {},
  theme: {
    'primary-color': '#3c8dbc',
  },
  dynamicImport: {
    loading: '@/components/Loading',
  },
});
