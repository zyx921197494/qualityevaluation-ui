import React, { useState } from 'react';
import styles from './index.less';
import {
  Button,
  Form,
  Table,
  Input,
  Divider,
  Select,
  Cascader,
  message,
} from 'antd';
import { region, getCycle, getIndex, startCycle } from '@/api/api';

function StartCycle(props: any) {
  const columns = [
    {
      title: '地址码',
      dataIndex: 'locationCode',
    },
    {
      title: '区县',
      dataIndex: 'countyName',
    },
    {
      title: '当前周期',
      dataIndex: 'currentCycle',
    },
  ];

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

  // table组件
  const [selectedRowKeys, setselectedRowKeys] = useState<any>([]);
  const hasSelected = selectedRowKeys.length > 0;

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

  // 根据行政区码查询下属各县的当前周期
  const [Cycle, setCycle] = useState([]);
  const onQueryCycle = (values: any) => {
    if (values.locationCode === undefined) {
      message.warning('至少选择到省级行政区划');
      return;
    }
    const key = 'Loading...';
    message.loading({ content: key, key });
    getCycle({
      locationCode: values.locationCode[values.locationCode.length - 1],
    }).then((res: any) => {
      if (res.statusCode === 200) {
        message.success({ content: res.message, key });
        for (let item of res.data) {
          item.key = item.locationCode;
        }
        setCycle(res.data);
      } else {
        message.error({ content: res.message, key });
      }
    });
  };

  // 评价体系查询
  const [EvaluateIndex, setEvaluateIndex] = useState([]);
  const [Loading, setLoading] = useState(false);
  const onFocus = () => {
    setLoading(true);
    getIndex().then((res: any) => {
      setLoading(false);
      if (res.statusCode === 200) {
        for (let item of res.data) {
          item.key = item.evaluateId;
          item.value = item.evaluateId;
          item.label = item.evaluateName;
        }
        setEvaluateIndex(res.data);
      } else {
        message.error({ content: '加载评价体系失败' });
      }
    });
  };

  // 开启新一周期
  const onStartCycle = () => {
    if (!hasSelected) {
      message.warning('请至少选择一所学校');
      return;
    }
    const key = 'Loading...';
    message.loading({ content: key, key });
    startCycle({
      evaluateIndexId: 1,
      locationCodes: selectedRowKeys,
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
      <div>
        <div>
          <Form
            className={styles.area}
            name="startCycleForm"
            onFinish={onStartCycle}
          >
            <Form.Item name="evaluateIndexId">
              <Select
                className={styles.select}
                placeholder="选择评价体系"
                loading={Loading}
                onFocus={onFocus}
                notFoundContent={null}
                options={EvaluateIndex}
              />
            </Form.Item>

            <Form.Item>
              <div>
                <Button type="primary" htmlType="submit" className={styles.btn}>
                  允许启动新一周期
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>

        <Divider />

        <div>
          <Form className={styles.area} onFinish={onQueryCycle}>
            <Form.Item name="locationCode">
              <Cascader
                className={styles.selectLong}
                options={options}
                loadData={loadData}
                placeholder="省/市/区县"
                changeOnSelect={true}
              />
            </Form.Item>

            <Form.Item>
              <Button
                className={styles.smallBtn}
                type="primary"
                htmlType="submit"
              >
                查询
              </Button>
            </Form.Item>
          </Form>
        </div>

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
          dataSource={Cycle}
          rowSelection={rowSelection}
          columns={columns}
        />
      </div>
    </>
  );
}

export default StartCycle;
