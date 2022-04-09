import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/home',
      component: '@/pages/home/index.tsx',
      exact: true,
      title: 'home',
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
});
