import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import styles from './index.less';

import { message, Button, Cascader, Form, Divider, Select, Table } from 'antd';
import { region, getScoreBySort } from '@/api/api';
import { Column } from '@ant-design/plots';

function schoolScoreBySort(props: any) {
  // 查询组件
  const typeList = [
    {
      label: '自评',
      value: 1,
    },
    {
      label: '督评',
      value: 2,
    },
  ];

  const sortList = [
    {
      label: '城市/农村学校',
      value: 1,
    },
    {
      label: '公办/民办学校',
      value: 2,
    },
    {
      label: '普惠/非普惠学校',
      value: 3,
    },
  ];

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

  const onFinish = (values: any) => {
    if (values.countyCode === undefined) {
      message.warning('请选择区县');
      return;
    }
    if (values.taskType === undefined) {
      message.warning('请选择任务类型');
      return;
    }
    if (values.sort === undefined) {
      message.warning('请选择分类');
      return;
    }
    getScoreBySort({
      scoreDTO: {
        locationCode: values.countyCode[values.countyCode.length - 1],
        taskType: values.taskType,
        isCity: values.sort === 1 ? 1 : null,
        isPublic: values.sort === 2 ? 1 : null,
        isGb: values.sort === 3 ? 1 : null,
      },
    }).then((res: any) => {
      if (res.statusCode === 200) {
        for (let item of res.data) {
          if (values.sort === 1) {
            item.name = item.name === 'index1' ? '城市学校' : '农村学校';
          } else if (values.sort === 2) {
            item.name = item.name === 'index1' ? '公办学校' : '民办学校';
          } else {
            item.name = item.name === 'index1' ? '普惠性学校' : '非普惠性学校';
          }
        }
        setData(res.data);
      } else {
        message.error({ content: res.message });
      }
    });
  };

  // 图表
  const [Data, setData] = useState([]);

  const config = {
    data: Data,
    isGroup: true,
    xField: 'x',
    yField: 'z',
    seriesField: 'name',
    marginRatio: 0.1,
    label: {
      position: 'top',
      layout: [
        {
          type: 'interval-adjust-position',
        },
        {
          type: 'interval-hide-overlap',
        },
        {
          type: 'adjust-color',
        },
      ],
    },
    tooltip: {
      formatter: (datum: Datum) => {
        return { name: datum.x, value: datum.z + '分' };
      },
    },
  };

  return (
    <>
      <div className={styles.area}>
        <Form layout="inline" onFinish={onFinish}>
          <Form.Item name="countyCode">
            <Cascader
              className={styles.selectLong}
              options={options}
              loadData={loadData}
              placeholder="省/市/区县"
              changeOnSelect={true}
            />
          </Form.Item>
          <Form.Item className={styles.select} name="taskType">
            <Select options={typeList} placeholder="选择评估任务"></Select>
          </Form.Item>
          <Form.Item className={styles.select} name="sort">
            <Select options={sortList} placeholder="选择分类"></Select>
          </Form.Item>
          <Form.Item>
            <Button className={styles.btn} type={'primary'} htmlType="submit">
              查询
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Divider />
      <div>
        <Column {...config} />
      </div>
    </>
  );
}

export default schoolScoreBySort;
