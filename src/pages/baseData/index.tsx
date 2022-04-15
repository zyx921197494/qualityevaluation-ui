import React, { useState } from 'react';
import styles from './index.less';
import { history } from 'umi';
import {
  Button,
  Select,
  Input,
  Form,
  Table,
  Cascader,
  message,
  Divider,
  Space,
  Modal,
} from 'antd';
import { region, schools, changeSchoolLocation, updateSchool } from '@/api/api';
import { EditTwoTone } from '@ant-design/icons';

const { Option, OptGroup } = Select;

function BaseData() {
  const [selectedRowKeys, setselectedRowKeys] = useState<any>([]); //selectedRowKeys：state。setselectedRowKeys：更新state的方法。useState<any>([])：[]为state的初始值
  const [school, setSchool] = useState([]);
  const [currentSchool, setcurrentSchool] = useState({});

  const start = () => {
    //初始化
    setselectedRowKeys([]);
  };

  const onSelectChange = (value: any) => {
    setselectedRowKeys([...value]);
    console.log(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

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
    {
      title: '操作',
      dataIndex: 'update',
      render: (text: any, records: any) => (
        <Space size="middle">
          <Button
            icon={<EditTwoTone />}
            type="link"
            onClick={() => showModal(records)}
          >
            修改
          </Button>
        </Space>
      ),
    },
  ];

  function handleChange(value: any) {
    console.log(`selected ${value}`);
  }

  function onChange(value: any, selectedOptions: any) {
    console.log(value);
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
      schoolCode: values.schoolCode === undefined ? '' : values.schoolCode,
      keyLocation: values.keyLocation === undefined ? '' : values.keyLocation,
      isCity: values.isCity === undefined ? '' : values.isCity,
      isPublic: values.isPublic === undefined ? '' : values.isPublic,
      isGB: values.isGB === undefined ? '' : values.isGB,
    }).then((res: any) => {
      if (res.statusCode === 200) {
        message.success({ content: res.message, key });
        for (let item of res.data.records) {
          item.key = item.code;
          item.isGenerallyBeneficial =
            item.isGenerallyBeneficial === 1 ? '是' : '否';
          item.isCentral = item.isCentral === 1 ? '是' : '否';
        }
        setSchool(res.data.records);
      } else {
        message.error({ content: res.message, key });
      }
    });
  };

  const onChangeFormFinish = (values: any) => {
    if (!hasSelected) {
      message.warning({ content: '请至少选择一所学校' });
      return;
    }
    if (values.targetLocationCode[2] === undefined) {
      message.warning({ content: '请选择要转入的区县' });
      return;
    }
    const key = 'updatable';
    message.loading({ content: 'Loading...', key, duration: 0 });
    changeSchoolLocation({
      locationCode: values.targetLocationCode[2],
      schoolCodes: selectedRowKeys,
    }).then((res: any) => {
      if (res.statusCode === 200) {
        message.success({ content: res.message, key });
      } else {
        message.error({ content: res.message, key });
      }
    });
  };

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

  // 修改学校信息
  const [visible, setVisible] = React.useState(false);
  const [loading, setloading] = React.useState(false);

  const showModal = (value: React.SetStateAction<{}>) => {
    setcurrentSchool(value);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onSchoolFinish = (values: any) => {
    setloading(true);

    updateSchool({
      code: values.code,
      name: values.name,
      location: values.lovation,
      locationTypeCode: values.locationTypeCode,
      typeCode: values.typeCode,
      hostCode: values.hostCode,
      isGenerallyBeneficial:
        values.isGenerallyBeneficial === '是' || values.isCentral === '1'
          ? 1
          : 0,
      isCentral: values.isCentral === '是' || values.isCentral === '1' ? 1 : 0,
    }).then((res: any) => {
      if (res.statusCode === 200) {
        setloading(false);
        setVisible(false);
        message.success({ content: res.message });
      } else {
        setloading(false);
        setVisible(false);
        message.error({ content: res.message });
      }
    });
  };

  return (
    <>
      <Modal
        destroyOnClose={true}
        title="修改学校信息"
        visible={visible}
        footer={null}
        style={{ width: 500, height: 800 }}
        centered={true}
      >
        <Form
          preserve={false}
          onFinish={onSchoolFinish}
          initialValues={currentSchool}
        >
          <Form.Item name="code" label="学校标识码">
            <Input disabled={true} />
          </Form.Item>

          <Form.Item name="name" label="学校名称">
            <Input />
          </Form.Item>

          <Form.Item name="location" label="学校地址">
            <Input />
          </Form.Item>

          <Form.Item name="locationTypeCode" label=" 驻地城乡类型">
            <Select onChange={handleChange}>
              <OptGroup label="城市">
                <Option key="100" value="100">
                  城镇
                </Option>
                <Option key="110" value="110">
                  城区
                </Option>
                <Option key="111" value="111">
                  主城区
                </Option>
                <Option key="112" value="112">
                  城乡结合区
                </Option>
                <Option key="120" value="120">
                  镇区
                </Option>
                <Option key="121" value="121">
                  镇中心区
                </Option>
                <Option key="122" value="122">
                  镇乡结合区
                </Option>
                <Option key="123" value="123">
                  特殊区域
                </Option>
              </OptGroup>
              <OptGroup label="乡镇">
                <Option key="200" value="200">
                  乡村
                </Option>
                <Option key="210" value="210">
                  乡中心区
                </Option>
                <Option key="220" value="220">
                  村庄
                </Option>
              </OptGroup>
            </Select>
          </Form.Item>

          <Form.Item name="typeCode" label="办学类型">
            <Select onChange={handleChange}>
              <Option key="111" value="111">
                幼儿园
              </Option>
              <Option key="211" value="211">
                小学
              </Option>
              <Option key="311" value="311">
                初级中学
              </Option>
              <Option key="342" value="342">
                高级中学
              </Option>
              <Option key="411" value="411">
                大学
              </Option>
              <Option key="933" value="933">
                其他培训机构
              </Option>
            </Select>
          </Form.Item>

          <Form.Item name="hostCode" label="举办者类型">
            <Select onChange={handleChange}>
              <OptGroup label="公办">
                <Option key="100" value="100">
                  中央党政机关
                </Option>
                <Option key="811" value="811">
                  省级教育部门
                </Option>
                <Option key="812" value="812">
                  省级其他部门
                </Option>
                <Option key="821" value="821">
                  市级教育部门
                </Option>
                <Option key="822" value="822">
                  市级其他部门
                </Option>
                <Option key="831" value="831">
                  县级教育部门
                </Option>
                <Option key="832" value="832">
                  县级其他部门
                </Option>
                <Option key="891" value="891">
                  地方企业
                </Option>
                <Option key="892" value="892">
                  事业单位
                </Option>
                <Option key="893" value="893">
                  部队
                </Option>
                <Option key="894" value="894">
                  集体
                </Option>
              </OptGroup>
              <OptGroup label="民办">
                <Option key="999" value="999">
                  民办
                </Option>
              </OptGroup>
            </Select>
          </Form.Item>

          <Form.Item name="isGenerallyBeneficial" label=" 是否普惠">
            <Select onChange={handleChange}>
              <Option key="1" value="1">
                是
              </Option>
              <Option key="0" value="0">
                否
              </Option>
            </Select>
          </Form.Item>

          <Form.Item name="isCentral" label="是否中心学校">
            <Select onChange={handleChange}>
              <Option key="1" value="1">
                是
              </Option>
              <Option key="0" value="0">
                否
              </Option>
            </Select>
          </Form.Item>

          <Form.Item className={styles.save}>
            <Button onClick={handleCancel}>取消</Button>
          </Form.Item>

          <Form.Item className={styles.save}>
            <Button type="primary" htmlType="submit" loading={loading}>
              保存
            </Button>
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
              onChange={onListChange}
              placeholder="省/市/区县"
              changeOnSelect={true}
            />
          </Form.Item>

          <Form.Item name="isGB">
            <Select
              className={styles.select}
              allowClear
              placeholder="是否普惠"
              onChange={onChange}
            >
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
              onChange={onChange}
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
            <Select
              className={styles.select}
              allowClear
              placeholder="是否公办"
              onChange={onChange}
            >
              <Option key="1" value="1">
                是
              </Option>
              <Option key="0" value="0">
                否
              </Option>
            </Select>
          </Form.Item>

          <Form.Item name="keyName">
            <Input className={styles.input} placeholder="幼儿园名称/关键字" />
          </Form.Item>

          <Form.Item name="schoolCode">
            <Input className={styles.input} placeholder="幼儿园标识码" />
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

      <Divider />

      <div className={styles.area}>
        <Form layout="inline" onFinish={onChangeFormFinish}>
          <Form.Item name="targetLocationCode">
            <Cascader
              className={styles.select}
              options={options}
              loadData={loadData}
              onChange={onListChange}
              placeholder="要转入的区县"
              changeOnSelect={true}
            />
          </Form.Item>

          <Form.Item>
            <Button
              className={styles.resetCondition}
              type={'primary'}
              htmlType="submit"
            >
              修改归属地
            </Button>
          </Form.Item>
        </Form>
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
          columns={columns}
          dataSource={school}
          rowSelection={rowSelection}
        />
      </div>
    </>
  );
}

export default BaseData;
