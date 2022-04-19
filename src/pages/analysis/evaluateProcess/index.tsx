import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import styles from './index.less';

import { message, Button, Cascader, Form, Divider, Tag } from 'antd';
import { evaluateCountyProcess, region, getCountyScore } from '@/api/api';
import { Pie, Column } from '@ant-design/plots';

function evaluateProcess(props: any) {
  // 级联组件
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
  const onListChange = (value: any, selectedOptions: any) => {
    // console.log("onListChange", selectedOptions[selectedOptions.length - 1]);
  };

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

  // 图表配置
  const [Self, setSelf] = useState([]);
  const [Sup, setSup] = useState([]);
  const [Score, setScore] = useState([]);
  const [Avg, setAvg] = useState({});

  const selfConfig = {
    appendPadding: 10,
    data: Self,
    angleField: 'y',
    colorField: 'x',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        // content: 'AntV\nG2Plot',
      },
    },
    legend: {
      layout: 'horizontal',
      position: 'top-left',
    },
    tooltip: {
      fields: ['x', 'y'],
      position: 'top',
      formatter: (datum: Datum) => {
        return { name: datum.x, value: datum.y + ' 所' };
      },
    },
  };

  const supConfig = {
    appendPadding: 10,
    data: Sup,
    angleField: 'y',
    colorField: 'x',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        // content: 'AntV\nG2Plot',
      },
    },
    legend: {
      layout: 'horizontal',
      position: 'top-left',
    },
    tooltip: {
      fields: ['x', 'y'],
      position: 'top',
      formatter: (datum: Datum) => {
        return { name: datum.x, value: datum.y + ' 所' };
      },
    },
  };

  const columnConfig = {
    data: Score,
    xField: 'x',
    yField: 'z',
    color: '#87D068',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
      title: {
        text: '各评估指标平均得分',
        position: 'center',
        offset: 50,
      },
    },
    meta: {
      x: {
        alias: '指标',
      },
      z: {
        alias: '得分',
      },
    },
  };

  const onFinish = (values: any) => {
    if (values.countyCode === undefined || values.countyCode[2] === undefined) {
      message.warning('请选择区县');
      return;
    }
    evaluateCountyProcess({
      countyCode: values.countyCode[2],
    }).then((res: any) => {
      if (res.statusCode === 200) {
        setSelf(res.data.self);
        setSup(res.data.sup);
      } else {
        message.error({ content: res.message });
      }
    });
    getCountyScore({
      countyCode: values.countyCode[2],
    }).then((res: any) => {
      if (res.statusCode === 200) {
        setScore(res.data.score);
        setAvg(res.data.avg);
      } else {
        message.error({ content: res.message });
      }
    });
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
              onChange={onListChange}
              placeholder="省/市/区县"
              changeOnSelect={true}
            />
          </Form.Item>
          <Form.Item>
            <Button className={styles.btn} type={'primary'} htmlType="submit">
              查询
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Divider>
        <Tag color="magenta">评估完成情况</Tag>
      </Divider>

      <div className={styles.area}>
        <div className={styles.pic}>
          <Pie {...selfConfig} />
        </div>
        <div className={styles.pic}>
          <Pie {...supConfig} />
        </div>
      </div>
      <Divider>
        <Tag color="magenta">指标评分得分</Tag>
      </Divider>
      <div className={styles.column}>
        <Column {...columnConfig} />
      </div>
    </>
  );
}

export default evaluateProcess;
