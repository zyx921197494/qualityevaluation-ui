import React, { useState } from 'react';
import styles from './index.less';
import {
  Button,
  Select,
  DatePicker,
  Input,
  Form,
  Table,
  Cascader,
  Tag,
  Divider,
  message,
  Space,
  Modal,
  Checkbox,
  Radio,
  BackTop,
} from 'antd';
import {
  region,
  schoolTask,
  exportEvaluationData,
  downloadReport,
  auditReport,
} from '@/api/api';
import {
  BarChartOutlined,
  CloudDownloadOutlined,
  SnippetsTwoTone,
} from '@ant-design/icons';

const { Option } = Select;

function evaluationData() {
  const [selectedRowKeys, setselectedRowKeys] = useState<any>([]);
  const [school, setSchool] = useState([]);

  const columns = [
    {
      title: 'id',
      dataIndex: 'taskId',
    },
    {
      title: '学校标识码',
      dataIndex: 'schoolCode',
    },
    {
      title: '学校名称',
      dataIndex: 'schoolName',
    },
    {
      title: '启动时间',
      dataIndex: 'startDate',
    },
    {
      title: '评估状态',
      dataIndex: 'taskStatus',
    },
    {
      title: '首次数据提交时间',
      dataIndex: 'firstSubmit',
    },
    {
      title: '最后数据提交时间',
      dataIndex: 'lastSubmit',
    },
    {
      title: '操作',
      dataIndex: 'option',
      render: (text: any, records: any) => (
        <Space size="middle">
          <Button
            icon={<SnippetsTwoTone />}
            type="link"
            onClick={() => showModal(records.submits)}
          >
            查看数据
          </Button>
        </Space>
      ),
    },
  ];

  // 查看任务已提交数据组件
  const [Visible, setVisible] = useState(false);
  const [Current, setCurrent] = useState([]);
  const showModal = (value: React.SetStateAction<never[]>) => {
    console.log(value);
    setVisible(true);
    setCurrent(value);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  //table组件
  const start = () => {
    //初始化
    setselectedRowKeys([]);
  };

  const onSelectChange = (value: any) => {
    setselectedRowKeys([...value]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  // 行政区划组件
  const optionLists = [
    {
      value: '110000000000',
      label: '北京市',
      isLeaf: false,
    },
    {
      value: '120000000000',
      label: '天津市',
      isLeaf: false,
    },
    {
      value: '130000000000',
      label: '河北省',
      isLeaf: false,
    },
    {
      value: '140000000000',
      label: '山西省',
      isLeaf: false,
    },
    {
      value: '150000000000',
      label: '内蒙古自治区',
      isLeaf: false,
    },
    {
      value: '210000000000',
      label: '辽宁省',
      isLeaf: false,
    },
    {
      value: '220000000000',
      label: '吉林省',
      isLeaf: false,
    },
    {
      value: '230000000000',
      label: '黑龙江省',
      isLeaf: false,
    },
    {
      value: '310000000000',
      label: '上海市',
      isLeaf: false,
    },
    {
      value: '320000000000',
      label: '江苏省',
      isLeaf: false,
    },
    {
      value: '330000000000',
      label: '浙江省',
      isLeaf: false,
    },
    {
      value: '340000000000',
      label: '安徽省',
      isLeaf: false,
    },
    {
      value: '350000000000',
      label: '福建省',
      isLeaf: false,
    },
    {
      value: '360000000000',
      label: '江西省',
      isLeaf: false,
    },
    {
      value: '370000000000',
      label: '山东省',
      isLeaf: false,
    },
    {
      value: '410000000000',
      label: '河南省',
      isLeaf: false,
    },
    {
      value: '420000000000',
      label: '湖北省',
      isLeaf: false,
    },
    {
      value: '430000000000',
      label: '湖南省',
      isLeaf: false,
    },
    {
      value: '440000000000',
      label: '广东省',
      isLeaf: false,
    },
    {
      value: '450000000000',
      label: '广西壮族自治区',
      isLeaf: false,
    },
    {
      value: '460000000000',
      label: '海南省',
      isLeaf: false,
    },
    {
      value: '500000000000',
      label: '重庆市',
      isLeaf: false,
    },
    {
      value: '510000000000',
      label: '四川省',
      isLeaf: false,
    },
    {
      value: '520000000000',
      label: '贵州省',
      isLeaf: false,
    },
    {
      value: '530000000000',
      label: '云南省',
      isLeaf: false,
    },
    {
      value: '540000000000',
      label: '西藏自治区',
      isLeaf: false,
    },
    {
      value: '610000000000',
      label: '陕西省',
      isLeaf: false,
    },
    {
      value: '620000000000',
      label: '甘肃省',
      isLeaf: false,
    },
    {
      value: '630000000000',
      label: '青海省',
      isLeaf: false,
    },
    {
      value: '640000000000',
      label: '宁夏回族自治区',
      isLeaf: false,
    },
    {
      value: '650000000000',
      label: '新疆维吾尔自治区',
      isLeaf: false,
    },
  ];
  const [options, setOptions] = useState(optionLists);

  const loadData = (selectedOptions: string | any[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    region({
      locationCode: targetOption.value,
    }).then((res: any) => {
      if (res.statusCode === 200) {
        // console.log(res)
        targetOption.loading = false;
        const leaf =
          res.data[0].code.substring(res.data[0].code.length - 8) !==
          '00000000';
        targetOption.children = [
          ...res.data.map((data: any) => {
            return {
              label: data.name,
              value: data.code,
              isLeaf: leaf,
            };
          }),
        ];
        setOptions([...options]);
      } else {
        message.error({ content: '加载行政区失败' });
      }
    });
  };

  // 提交查询
  const onFinish = (values: any) => {
    if (values.taskType === undefined) {
      message.warning('请选择评估类型');
      return;
    }
    if (values.taskStatus === undefined) {
      message.warning('请选择评估状态');
      return;
    }
    const key = 'updatable';
    message.loading({ content: 'Loading...', key, duration: 0 });

    schoolTask({
      provinceCode:
        values.locationCode === undefined ? null : values.locationCode[0],
      cityCode:
        values.locationCode === undefined ? null : values.locationCode[1],
      countyCode:
        values.locationCode === undefined ? null : values.locationCode[2],
      keyName: values.keyName === undefined ? '' : values.keyName,
      schoolCode: values.schoolCode === undefined ? '' : values.schoolCode,
      isCity: values.isCity === undefined ? '' : values.isCity,
      isPublic: values.isPublic === undefined ? '' : values.isPublic,
      isGB: values.isGB === undefined ? '' : values.isGB,
      taskType: values.taskType,
      taskStatus: values.taskStatus,
      startDate: values.startDate === undefined ? '' : values.startDate,
      currentPage: 1,
      pageSize: 100,
    }).then((res: any) => {
      if (res.statusCode === 200) {
        message.success({ content: res.message, key });
        for (let item of res.data) {
          item.key = item.schoolCode;
          const first = item.firstSubmit.split('T');
          item.firstSubmit = first[0] + ' ' + first[1];
          const last = item.lastSubmit.split('T');
          item.lastSubmit = last[0] + ' ' + last[1];
        }
        setSchool(res.data);
      } else {
        message.error({ content: res.message, key });
      }
    });
  };

  // 导出评估数据
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');

  const onTypeChange = (value: string) => {
    setType(value);
  };

  const onStatusChange = (value: string) => {
    setStatus(value);
  };

  const exportData = () => {
    if (status < '3') {
      message.warning('只能导出评估数据已提交学校的数据');
      return;
    }
    if (!hasSelected) {
      message.warning('请至少选择一所学校');
      return;
    }
    const key = 'loading';
    message.loading({ content: '正在导出...', key, duration: 0 });
    exportEvaluationData({
      taskType: type,
      schools: selectedRowKeys,
    }).then((res: any) => {
      if (res.statusCode === 200) {
        message.success({ content: res.message, key });
      } else {
        message.error({ content: res.message, key });
      }
    });
  };

  // 下载报告
  const onDownload = () => {
    if (status < '4') {
      message.warning('报告下载仅限于报告已提交的学校');
      return;
    }
    if (!hasSelected) {
      message.warning('请至少选择一所学校');
      return;
    }
    const key = 'loading';
    message.loading({ content: '正在下载...', key, duration: 0 });
    downloadReport({
      type: type,
      schoolCodes: selectedRowKeys,
    }).then((res: any) => {
      if (res.statusCode === 200) {
        message.success({ content: res.message, key });
      } else {
        message.error({ content: res.message, key });
      }
    });
  };

  // 审核报告
  const onAudit = (accept: number) => {
    if (type === '1') {
      message.warning('自评报告无需审核');
      return;
    }
    if (status != '4' && status != '5') {
      message.warning('只能审核报告已提交或报告审核未通过的学校');
      return;
    }
    if (!hasSelected) {
      message.warning('请至少选择一所学校');
      return;
    }
    const key = 'loading';
    message.loading({ content: 'Loading...', key, duration: 0 });
    auditReport({
      type: type,
      isAccept: accept,
      schoolCodes: selectedRowKeys,
    }).then((res: any) => {
      if (res.statusCode === 200) {
        message.success({ content: res.message, key });
      } else {
        message.error({ content: res.message, key });
      }
    });
  };

  return (
    <>
      <Modal
        destroyOnClose={true}
        title="查看评估数据"
        visible={Visible}
        footer={null}
        width={800}
        closable={false}
        keyboard={true}
      >
        <Form.Item className={styles.save}>
          <Button onClick={handleCancel}>关闭</Button>
        </Form.Item>
        <Form preserve={false}>
          {Current.map((data, index) => {
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
                    // name={'id' + '_' + data.key}
                    className={styles.questionArea}
                  >
                    {data.type == '3' ? (
                      <Checkbox.Group
                        disabled={true}
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
                        disabled={true}
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
                        disabled={true}
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
                <Divider />
              </div>
            );
          })}
          <Form.Item className={styles.save}>
            <Button onClick={handleCancel}>关闭</Button>
          </Form.Item>
          <Divider />
        </Form>
      </Modal>

      <div className={styles.area}>
        <Form layout="inline" onFinish={onFinish}>
          <Form.Item name="locationCode">
            <Cascader
              className={styles.selectLong}
              options={options}
              loadData={loadData}
              placeholder="省/市/区县"
              changeOnSelect={true}
            />
          </Form.Item>

          <Form.Item name="isGb">
            <Select className={styles.select} allowClear placeholder="是否普惠">
              <Option key="1" value="1">
                是
              </Option>
              <Option key="0" value="0">
                否
              </Option>
            </Select>
          </Form.Item>

          <Form.Item name="isCity">
            <Select
              className={styles.select}
              allowClear
              placeholder="是否城市园"
            >
              <Option key="1" value="1">
                是
              </Option>
              <Option key="0" value="0">
                否
              </Option>
            </Select>
          </Form.Item>

          <Form.Item name="isPublic">
            <Select className={styles.select} allowClear placeholder="是否公办">
              <Option key="1" value="1">
                是
              </Option>
              <Option key="0" value="0">
                否
              </Option>
            </Select>
          </Form.Item>

          <Form.Item name="taskType">
            <Select
              className={styles.select}
              allowClear={true}
              placeholder="请选择评估类型"
              onChange={onTypeChange}
            >
              <Option key="1" value="1">
                自评
              </Option>
              <Option key="2" value="2">
                督评
              </Option>
            </Select>
          </Form.Item>

          <Form.Item name="taskStatus">
            <Select
              className={styles.select}
              allowClear={true}
              placeholder="请选择评估状态"
              onChange={onStatusChange}
            >
              <Option key="1" value="1">
                未启动
              </Option>
              <Option key="2" value="2">
                评估中
              </Option>
              <Option key="3" value="3">
                评估数据已提交
              </Option>
              <Option key="4" value="4">
                报告已提交
              </Option>
              <Option key="5" value="5">
                报告审核不通过
              </Option>
              <Option key="6" value="6">
                报告审核通过
              </Option>
            </Select>
          </Form.Item>

          <Form.Item name="createstartDateTime">
            <DatePicker
              className={styles.select}
              placeholder="评估启动日期"
              format={'YYYY-MM-DD'}
            ></DatePicker>
          </Form.Item>

          <Form.Item name="keyName">
            <Input className={styles.input} placeholder="请输入学校名称" />
          </Form.Item>

          <Form.Item name="schoolCode">
            <Input className={styles.input} placeholder="请输入学校标识码" />
          </Form.Item>

          <Form.Item>
            <Button className={styles.btn} type={'primary'} htmlType="submit">
              查询
            </Button>
          </Form.Item>
          <Form.Item>
            <Button className={styles.resetCondition} htmlType="reset">
              重置搜索条件
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className={styles.audit}>
        <div>
          <Divider orientation="left">
            <Tag icon={<BarChartOutlined />} color="blue">
              评估数据
            </Tag>
          </Divider>
          <Button type={'primary'} htmlType="submit" onClick={exportData}>
            导出选中结果
          </Button>
        </div>
        <div>
          <Divider orientation="left">
            <Tag icon={<CloudDownloadOutlined />} color="blue">
              报告文件
            </Tag>
          </Divider>
          <Button
            className={styles.btn}
            type={'primary'}
            htmlType="submit"
            onClick={onDownload}
          >
            下载报告文件
          </Button>
          <Button
            className={styles.btn}
            type={'primary'}
            htmlType="submit"
            onClick={() => onAudit(1)}
          >
            审核通过
          </Button>
          <Button
            className={styles.btn}
            type={'primary'}
            htmlType="submit"
            onClick={() => onAudit(0)}
          >
            审核不通过
          </Button>
        </div>
      </div>

      <div className={styles.between}>
        <Button
          className={styles.between}
          type="primary"
          onClick={start}
          disabled={!hasSelected}
        >
          重置选择
        </Button>

        <span style={{ marginLeft: 10 }}>
          {hasSelected ? `已选 ${selectedRowKeys.length} 条` : ''}
        </span>

        <Table
          columns={columns}
          dataSource={school}
          rowSelection={rowSelection}
        />
      </div>
    </>
  );
}

export default evaluationData;
