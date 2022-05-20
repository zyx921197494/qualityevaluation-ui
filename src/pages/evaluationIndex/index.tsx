import React, { useState } from 'react';
import styles from './index.less';
import { history } from 'umi';
import {
  Button,
  Select,
  Input,
  Form,
  message,
  Divider,
  Space,
  Tag,
} from 'antd';
import {
  getIndex,
  getIndex1,
  getIndex2,
  getIndex3,
  newIndex,
  newIndex1,
  newIndex2,
  newIndex3,
} from '@/api/api';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

function evaluationIndex() {
  const { Option } = Select;

  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [form4] = Form.useForm();

  const [Index, setIndex] = useState([]);
  const [Index1, setIndex1] = useState([]);
  const [Index2, setIndex2] = useState([]);

  const [Form1Select, setForm1Select] = useState(0);
  const [Form2Select, setForm2Select] = useState(0);

  const onGetIndex = () => {
    const key = 'updatable';
    getIndex().then((res: any) => {
      if (res.statusCode === 200) {
        for (let item of res.data) {
          item.key = item.evaluateId;
          item.value = item.evaluateId;
          item.label = item.evaluateName;
        }
        setIndex(res.data);
      } else {
        message.error({ content: res.message, key });
      }
    });
  };

  const onSelectIndex1 = (value: any) => {
    setForm1Select(value);
  };

  const onGetIndex1 = (values: any) => {
    const key = 'updatable';
    getIndex1({
      indexId: Form1Select,
    }).then((res: any) => {
      if (res.statusCode === 200) {
        for (let item of res.data) {
          item.key = item.index1Id;
          item.value = item.index1Id;
          item.label = item.index1Content;
        }
        setIndex1(res.data);
      } else {
        message.error({ content: res.message, key });
      }
    });
  };

  const onSelectIndex2 = (value: any) => {
    setForm2Select(value);
  };

  const onGetIndex2 = () => {
    const key = 'updatable';
    getIndex2({
      index1Id: Form2Select,
    }).then((res: any) => {
      if (res.statusCode === 200) {
        for (let item of res.data) {
          item.key = item.index2Id;
          item.value = item.index2Id;
          item.label = item.index2Content;
        }
        setIndex2(res.data);
      } else {
        message.error({ content: res.message, key });
      }
    });
  };

  const onNewIndex = (values: any) => {
    if (
      values.name === undefined ||
      values.name === '' ||
      values.memo === undefined ||
      values.memo === ''
    ) {
      message.warning('请完整填写内容');
      return;
    }
    const key = 'updatable';
    message.loading({ content: 'Loading...', key, duration: 0 });
    newIndex({
      name: values.name,
      memo: values.memo,
    }).then((res: any) => {
      if (res.statusCode === 200) {
        message.success({ content: res.message, key });
      } else {
        message.error({ content: res.message, key });
      }
    });
  };

  const onNewIndex1 = (values: any) => {
    const key = 'updatable';
    if ((values.list = 'undefined')) {
      message.warning({ content: '至少添加一项指标', key });
      return;
    }
    message.loading({ content: 'Loading...', key, duration: 0 });
    newIndex1({
      indexId: values.indexId,
      list: values.list,
    }).then((res: any) => {
      if (res.statusCode === 200) {
        message.success({ content: res.message, key });
      } else {
        message.error({ content: res.message, key });
      }
    });
  };

  const onNewIndex2 = (values: any) => {
    const key = 'updatable';
    if ((values.list = 'undefined')) {
      message.warning({ content: '至少添加一项指标', key });
      return;
    }
    message.loading({ content: 'Loading...', key, duration: 0 });
    newIndex2({
      index1Id: values.index1Id,
      list: values.list,
    }).then((res: any) => {
      if (res.statusCode === 200) {
        message.success({ content: res.message, key });
      } else {
        message.error({ content: res.message, key });
      }
    });
  };

  const onNewIndex3 = (values: any) => {
    const key = 'updatable';
    if ((values.list = 'undefined')) {
      message.warning({ content: '至少添加一项指标', key });
      return;
    }
    message.loading({ content: 'Loading...', key, duration: 0 });
    newIndex3({
      index2Id: values.index2Id,
      list: values.list,
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
      <Divider orientation="left">
        <Tag color="magenta">新增评估体系</Tag>
      </Divider>
      <div className={styles.area}>
        <Form form={form1} onFinish={onNewIndex}>
          <Form.Item
            name="name"
            label="评价体系名称"
            rules={[{ required: true, message: '请输入评价体系名称' }]}
            className={styles.input}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="memo"
            label="评价体系备注"
            rules={[{ required: true, message: '请输入评价体系备注' }]}
            className={styles.input}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            新增评价体系
          </Button>
        </Form>
      </div>

      <Divider orientation="left">
        <Tag color="green">添加一级指标</Tag>
      </Divider>
      <div className={styles.area}>
        <Form
          form={form2}
          name="index1"
          onFinish={onNewIndex1}
          autoComplete="off"
        >
          <Form.Item
            name="indexId"
            label="评价体系"
            rules={[{ required: true, message: '请选择评价体系' }]}
            className={styles.selectLong}
          >
            <Select onFocus={onGetIndex} options={Index} allowClear />
          </Form.Item>

          <Form.List name="list">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space key={field.key} align="baseline">
                    <Form.Item
                      {...field}
                      label="一级指标名称"
                      name={[field.name, 'index1Content']}
                      rules={[
                        { required: true, message: '请输入一级指标名称' },
                      ]}
                      className={styles.input}
                    >
                      <Input />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    添加一级指标
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              添加一级指标
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Divider orientation="left">
        <Tag color="cyan">添加二级指标</Tag>
      </Divider>
      <div className={styles.area}>
        <Form
          form={form3}
          name="index2"
          onFinish={onNewIndex2}
          autoComplete="off"
        >
          <Form.Item
            name="indexId"
            label="评价体系"
            rules={[{ required: true, message: '请选择评价体系' }]}
            className={styles.selectLong}
          >
            <Select
              onFocus={onGetIndex}
              options={Index}
              onSelect={onSelectIndex1}
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="index1Id"
            label="一级指标"
            rules={[{ required: true, message: '请选择一级指标' }]}
            className={styles.selectLong}
          >
            <Select onFocus={onGetIndex1} options={Index1} allowClear />
          </Form.Item>

          <Form.List name="list">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space key={field.key} align="baseline">
                    <Form.Item
                      {...field}
                      label="二级指标名称"
                      name={[field.name, 'index2Content']}
                      rules={[
                        { required: true, message: '请输入二级指标名称' },
                      ]}
                      className={styles.input}
                    >
                      <Input />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    添加二级指标
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              添加二级指标
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Divider orientation="left">
        <Tag color="#2db7f5">添加三级指标</Tag>
      </Divider>
      <div className={styles.area}>
        <Form
          form={form4}
          name="index3"
          onFinish={onNewIndex3}
          autoComplete="off"
        >
          <Form.Item
            name="indexId"
            label="评价体系"
            rules={[{ required: true, message: '请选择评价体系' }]}
            className={styles.selectLong}
          >
            <Select
              onFocus={onGetIndex}
              options={Index}
              onSelect={onSelectIndex1}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="index1Id"
            label="一级指标"
            rules={[{ required: true, message: '请选择一级指标' }]}
            className={styles.selectLong}
          >
            <Select
              onFocus={onGetIndex1}
              options={Index1}
              onSelect={onSelectIndex2}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="index2Id"
            label="二级指标"
            rules={[{ required: true, message: '请选择二级指标' }]}
            className={styles.selectLong}
          >
            <Select onFocus={onGetIndex2} options={Index2} allowClear />
          </Form.Item>
          <Form.List name="list">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space key={field.key} align="baseline">
                    <Form.Item
                      {...field}
                      label="三级指标内容"
                      name={[field.name, 'index3Name']}
                      rules={[
                        { required: true, message: '请输入三级指标内容' },
                      ]}
                      className={styles.input}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="三级指标类型"
                      name={[field.name, 'type']}
                      rules={[
                        { required: true, message: '请选择三级指标类型' },
                      ]}
                      className={styles.input}
                    >
                      <Select>
                        <Option value="1">判断</Option>
                        <Option value="2">单选</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="三级指标选项"
                      name={[field.name, 'index3Content']}
                      rules={[{ required: true, message: '三级指标选项' }]}
                      className={styles.input}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="三级指标分值"
                      name={[field.name, 'index3Score']}
                      rules={[{ required: true, message: '请输入指标分值' }]}
                      className={styles.input}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="备注"
                      name={[field.name, 'memo']}
                      className={styles.input}
                    >
                      <Input />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    添加三级指标
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              添加三级指标
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default evaluationIndex;
