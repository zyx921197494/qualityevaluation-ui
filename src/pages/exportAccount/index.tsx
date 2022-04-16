import React, { useState } from 'react';
import styles from './index.less';
import {
  Button,
  Select,
  DatePicker,
  Input,
  Form,
  Table,
  message,
  Cascader,
} from 'antd';
import { region, schools, exportUser } from '@/api/api';
import { DownloadOutlined } from '@ant-design/icons';

const { Option } = Select;

function ExportAccount() {
  const [selectedRowKeys, setselectedRowKeys] = useState<any>([]); //selectedRowKeys：state。setselectedRowKeys：更新state的方法。useState<any>([])：[]为state的初始值
  const [school, setSchool] = useState([]);

  const columns = [
    {
      title: '标识码',
      dataIndex: 'code',
    },
    {
      title: '区县',
      dataIndex: 'locationCode',
    },
    {
      title: '幼儿园名称',
      dataIndex: 'name',
    },
    {
      title: '地址',
      dataIndex: 'location',
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

  function onChange(value: any) {
    console.log(`selected ${value}`);
  }

  const onFinish = (values: any) => {
    if (
      values.locationCode === undefined ||
      values.locationCode[2] === undefined
    ) {
      message.warning('请选择区县');
      return;
    }
    const key = 'updatable';
    message.loading({ content: 'Loading...', key, duration: 0 });
    schools({
      keyName: values.keyName === undefined ? '' : values.keyName,
      locationCode:
        values.locationCode === undefined
          ? ''
          : values.locationCode[values.locationCode.length - 1],
      current: 1,
      pageSize: 10,
      schoolCode: '',
      keyLocation: '',
      isCity: '',
      isPublic: '',
      isGB: '',
    }).then((res: any) => {
      if (res.statusCode === 200) {
        message.success({ content: res.message, key });
        for (let item of res.data.records) {
          item.key = item.code;
        }
        console.log(res.data.records);
        setSchool(res.data.records);
      } else {
        message.error({ content: res.message, key });
      }
    });
  };

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

  const onclick = (authorityId: number) => {
    const key = 'updatable';
    if (!hasSelected) {
      message.warning({ content: '请至少选择一所幼儿园', key });
      return;
    }
    message.loading({ content: '导出中...', key, duration: 0 });
    exportUser({
      authorityId: authorityId,
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
      <div className={styles.area}>
        <Form layout="inline" onFinish={onFinish}>
          <Form.Item className={styles.selectLong} name="locationCode">
            <Cascader
              className={styles.select}
              options={options}
              loadData={loadData}
              onChange={onListChange}
              placeholder="省/市/区县"
              changeOnSelect={true}
            />
          </Form.Item>

          {/* <Form.Item name="createTime">
            <DatePicker
              placeholder="账号创建时间"
              format={'YYYY-MM-DD'}
            ></DatePicker>
          </Form.Item> */}

          <Form.Item name="keyName">
            <Input placeholder="请输入幼儿园名称" />
          </Form.Item>

          <Form.Item>
            <Button type={'primary'} htmlType="submit">
              查询
            </Button>
          </Form.Item>

          <Form.Item>
            <Button htmlType="reset">重置搜索条件</Button>
          </Form.Item>
        </Form>
      </div>

      <div className={styles.area2}>
        <Button
          type={'primary'}
          icon={<DownloadOutlined />}
          htmlType="submit"
          onClick={() => onclick(5)}
        >
          导出自评账号
        </Button>
        <Button
          type={'primary'}
          icon={<DownloadOutlined />}
          htmlType="submit"
          onClick={() => onclick(6)}
        >
          导出督评账号
        </Button>
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
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `已选 ${selectedRowKeys.length} 条` : ''}
        </span>
        <Table
          dataSource={school}
          rowSelection={rowSelection}
          columns={columns}
        />
      </div>
    </>
  );
}

export default ExportAccount;
