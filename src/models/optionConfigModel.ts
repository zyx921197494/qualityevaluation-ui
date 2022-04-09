// import { saveSchema, getSchema } from '@/api/project';
// import { message } from 'antd';

// const optionConfigModel = {
//   namespace: 'optionConfig',
//   state: {
//     canvasSize: {
//       width: '1200px',
//       height: '740px',
//     },
//     componentData: [],
//     id: 0,
//     mode: true,
//   },
//   reducers: {
//     changeComponentData(state: any, action: { payload: any }) {
//       return { ...state, ...action.payload };
//     },
//     choose(state: any, action: { payload: any }) {
//       return { ...state, ...action.payload };
//     },
//     emptyData(state: any) {
//       let newSate = JSON.parse(JSON.stringify(state));
//       newSate.componentData = [];
//       newSate.id = 0;
//       return { ...newSate };
//     },
//     canvasChange(state: any, action: { payload: any }) {
//       return { ...state, ...action.payload };
//     },
//     changeMode(state: any) {
//       let newState = JSON.parse(JSON.stringify(state));
//       newState.mode = !state.mode;
//       return { ...newState };
//     },
//   },
//   effects: {
//     *getComponentData({ payload: params }: any, { call, put }: any) {
//       const { data, flag } = yield call(getSchema, params);
//       if (flag === 'success') {
//         const res = data.content === null ? [] : JSON.parse(data.content);
//         yield put({
//           type: 'changeComponentData',
//           payload: {
//             componentData: [...res],
//           },
//         });
//       }
//     },

//     *saveComponentData({ payload: params }: any, { call }: any) {
//       const { flag } = yield call(saveSchema, params);
//       if (flag === 'success') {
//         message.success('保存成功');
//       } else {
//         message.error('保存失败');
//       }
//     },
//   },
// };
// export default optionConfigModel;
