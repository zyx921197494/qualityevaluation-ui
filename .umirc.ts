import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
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
      path: '/login',
      component: '@/pages/login/index.tsx',
      exact: true,
      title: '登录',
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
      path: '/system/changeUserPassword',
      component: '@/pages/changeUserPassword/index.tsx',
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
      title: '区修改密码',
    },

    // {
    //   path: '/workPlace',
    //   component: '@/pages/work-place/index.tsx',
    //   exact: true,
    //   title: '工作台',
    //   wrappers: ['@/wrappers/auth'],
    // },
    // {
    //   path: '/viperCode',
    //   component: '@/pages/layout/index.tsx',
    //   wrappers: ['@/wrappers/auth'],
    //   routes: [
    //     {
    //       path: '/viperCode/home',
    //       component: '@/pages/home/index.tsx',
    //       exact: true,
    //       title: '首页',
    //     },

    //     {
    //       path: '/viperCode/warehouse',
    //       component: '@/pages/warehouse/index.tsx',
    //       exact: true,
    //       title: '项目库',
    //     },
    //     {
    //       path: '/viperCode/playground',
    //       component: '@/pages/playground/index.tsx',
    //       exact: true,
    //       title: '模块广场',
    //     },
    //     {
    //       path: '/viperCode/person',
    //       component: '@/pages/person/index.tsx',
    //       exact: true,
    //       title: '个人主页',
    //     },
    //     {
    //       path: '/viperCode/team',
    //       component: '@/pages/team/index.tsx',
    //       exact: true,
    //       title: '团队主页',
    //     },
    //   ],
    // },
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
});
