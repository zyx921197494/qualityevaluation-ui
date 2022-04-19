import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import styles from './index.less';
import {
  PageHeader,
  Button,
  Divider,
  Checkbox,
  Form,
  Radio,
  Upload,
  message,
  BackTop,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { data } from 'browserslist';
import {
  getSubmittedEvaluation,
  submitEvaluation,
  uploadEvidence,
  getSubmittedEvaluationSup,
  submitEvaluationSup,
  uploadEvidenceSup,
} from '@/api/api';

function userEvaluate(props: any) {
  const [Role, setRole] = useState(0);
  useEffect(() => {
    const type = localStorage.getItem('token_type');
    if (type.split('_')[1] === 'self') {
      setRole(1);
      getSubmittedEvaluation().then((res: any) => {
        if (res.statusCode === 200) {
          message.success({ content: res.message });
          for (let item of res.data) {
            item.key = item.index3id;
          }
          setdata(res.data);
        } else {
          message.error({ content: res.message });
        }
      });
    } else {
      setRole(2);
      getSubmittedEvaluationSup().then((res: any) => {
        if (res.statusCode === 200) {
          message.success({ content: res.message });
          for (let item of res.data) {
            item.key = item.index3id;
          }
          setdata(res.data);
        } else {
          message.error({ content: res.message });
        }
      });
    }
  }, []);

  const [data, setdata] = useState([]);

  // 判断题选项
  const judgeItems = [
    { label: '是', value: 'A' },
    { label: '否', value: 'B' },
  ];

  // useEffect(() => {
  //   const key = 'loading...';
  //   message.loading({ content: key, key, duration: 0 });
  //   if (Role === 1) {
  //     getSubmittedEvaluation().then((res: any) => {
  //       if (res.statusCode === 200) {
  //         message.success({ content: res.message, key });
  //         for (let item of res.data) {
  //           item.key = item.index3id;
  //         }
  //         setdata(res.data);
  //       } else {
  //         message.error({ content: res.message, key });
  //       }
  //     });
  //   } else {
  //     getSubmittedEvaluationSup().then((res: any) => {
  //       if (res.statusCode === 200) {
  //         message.success({ content: res.message, key });
  //         for (let item of res.data) {
  //           item.key = item.index3id;
  //         }
  //         setdata(res.data);
  //       } else {
  //         message.error({ content: res.message, key });
  //       }
  //     });
  //   }
  // }, []);

  // 上传证据文件
  const upload = () => {
    const key = 'loading...';
    message.loading({ content: key, key, duration: 0 });
    if (Role === 1) {
      uploadEvidence({}).then((res: any) => {
        if (res.statusCode === 200) {
          message.success({ content: res.message, key });
          for (let item of res.data) {
            item.key = item.index3id;
          }
        } else {
          message.error({ content: res.message, key });
        }
      });
    } else {
      uploadEvidenceSup({}).then((res: any) => {
        if (res.statusCode === 200) {
          message.success({ content: res.message, key });
          for (let item of res.data) {
            item.key = item.index3id;
          }
        } else {
          message.error({ content: res.message, key });
        }
      });
    }
  };

  // 提交评估
  const onFinish = (values: any) => {
    const key = 'loading...';
    let param = [];
    for (let i in values) {
      if (values[i] === undefined) continue;
      let content = '';

      for (let j in values[i]) {
        content += values[i][j];
      }

      param.push({
        index3Id: i.split('_')[1],
        content: content,
      });
    }
    console.log(param);
    message.loading({ content: key, key, duration: 0 });
    if (Role === 1) {
      submitEvaluation({
        submitVos: param,
      }).then((res: any) => {
        if (res.statusCode === 200) {
          message.success({ content: res.message, key });
        } else {
          message.error({ content: res.message, key });
        }
      });
    } else {
      submitEvaluationSup({
        submitVos: param,
      }).then((res: any) => {
        if (res.statusCode === 200) {
          message.success({ content: res.message, key });
        } else {
          message.error({ content: res.message, key });
        }
      });
    }
  };

  const onValuesChange = (a, b) => {
    console.log(a);
    console.log(b);
  };

  return (
    <div>
      <div className={styles.header}>
        <PageHeader
          ghost={false}
          className="site-page-header"
          onBack={() => history.push('/user/userHome')}
          title="评估页"
          subTitle="根据学校实际情况选择选项，完成评估"
        />
      </div>

      <div className={styles.page}>
        <BackTop />
        <Form onFinish={onFinish} onValuesChange={onValuesChange}>
          {data.map((data, index) => {
            return (
              <div key={index}>
                <div className={styles.question}>
                  <Form.Item>
                    <p>
                      {index + 1}、{data.index3Name} ______ 。
                      {data.memo == undefined ? '' : '(' + data.memo + ')'}
                    </p>
                  </Form.Item>
                  <Form.Item
                    name={'id' + '_' + data.key}
                    className={styles.questionArea}
                  >
                    {data.type == '3' ? (
                      <Checkbox.Group
                        defaultValue={
                          data.content == undefined
                            ? []
                            : data.content.split('')
                        }
                        options={[
                          {
                            label: data.index3Content.split('|')[0],
                            value: 'A',
                          },
                          {
                            label: data.index3Content.split('|')[1],
                            value: 'B',
                          },
                          {
                            label: data.index3Content.split('|')[2],
                            value: 'C',
                          },
                          {
                            label: data.index3Content.split('|')[3],
                            value: 'D',
                          },
                        ]}
                      />
                    ) : data.type == '2' ? (
                      <Radio.Group
                        defaultValue={
                          data.content == undefined ? [] : data.content
                        }
                        options={[
                          {
                            label: data.index3Content.split('|')[0],
                            value: 'A',
                          },
                          {
                            label: data.index3Content.split('|')[1],
                            value: 'B',
                          },
                          {
                            label: data.index3Content.split('|')[2],
                            value: 'C',
                          },
                          {
                            label: data.index3Content.split('|')[3],
                            value: 'D',
                          },
                        ]}
                      />
                    ) : (
                      <Radio.Group
                        options={[
                          {
                            label: data.index3Content.split('|')[0],
                            value: 'A',
                          },
                          {
                            label: data.index3Content.split('|')[1],
                            value: 'B',
                          },
                        ]}
                        defaultValue={
                          data.content == undefined ? [] : data.content
                        }
                      />
                    )}
                  </Form.Item>
                </div>

                {/* <div className={styles.evidence}> */}
                <Form.Item className={styles.evidence}>
                  <Upload>
                    <Button
                      htmlType="submit"
                      icon={<UploadOutlined />}
                      onClick={upload}
                    >
                      上传证据文件
                    </Button>
                  </Upload>
                </Form.Item>
                {/* </div> */}

                <Divider />
              </div>
            );
          })}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default userEvaluate;
