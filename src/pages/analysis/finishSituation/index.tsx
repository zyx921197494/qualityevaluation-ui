import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import styles from './index.less';

import { message, Button } from 'antd';
import { finishResult } from '@/api/api';
import { Column } from '@ant-design/plots';

function finishSituation(props: any) {
  const [Data, setData] = useState([]);

  useEffect(() => {
    finishResult().then((res: any) => {
      if (res.statusCode === 200) {
        setData(res.data);
      } else {
        message.error({ content: res.message });
      }
    });
  }, []);

  const config = {
    data: Data,
    isGroup: true,
    xField: 'x',
    yField: 'y',
    seriesField: 'name',
    legend: {
      title: {
        title: '自评报告已提交和督评报告审核通过数量',
        spacing: 10,
      },
      itemName: {
        formatter: (text: string, item: ListItem, index: number) => {
          if (text === '自评') {
            return '自评(报告已提交)';
          } else {
            return '督评(报告审核已通过)';
          }
        },
      },
    },

    marginRatio: 0.1,
    label: {
      position: 'top',
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
        },
      ],
    },
  };

  return (
    <>
      <div>
        <Column {...config} />
      </div>
    </>
  );
}

export default finishSituation;
