import styles from './index.less';

import {
  Input,
  Space,
  Button,
  Cascader,
  Radio,
  Checkbox,
  DatePicker,
} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import { Upload, Modal } from 'antd';
import {
  LoadingOutlined,
  PaperClipOutlined,
  PictureTwoTone,
  FilePdfTwoTone,
  FileWordTwoTone,
  FileExcelTwoTone,
  PlusOutlined,
} from '@ant-design/icons';

import 'antd/dist/antd.less';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
            children: [
              {
                value: 'aaa',
                label: 'aaa',
              },
            ],
          },
          {
            value: 'xiasha',
            label: 'Xia Sha',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua men',
          },
        ],
      },
    ],
  },
];

function loginForm(props) {
  function filter(inputValue, path) {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
    );
  }

  function onInputChange(e) {
    console.log(e.target.value);
  }

  function onClick(e) {
    alert(e.target.checked + ', ' + e.target.value);
  }

  function onChange(value, selectedOptions) {
    console.log(value);
  }

  function onDateChange(date, dateString) {
    alert(dateString);
  }

  return (
    <div>
      <Input
        onChange={onInputChange}
        style={{ width: 100, marginLeft: 10 }}
        placeholder="用户名"
      />

      <Input.Password
        style={{ width: 100, marginLeft: 10 }}
        placeholder="密码"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
      />
      <Button type="primary">登录</Button>

      <Cascader
        options={options}
        onChange={onChange}
        placeholder="请选择"
        showSearch={{ filter }}
        onSearch={(value) => console.log(value)}
      />

      <div>
        <Radio.Group>
          <Space direction="vertical">
            <Radio value={'A'} onClick={onClick}>
              A
            </Radio>
            <Radio value={'B'} onClick={onClick}>
              B
            </Radio>
            <Radio value={'C'} onClick={onClick}>
              C
            </Radio>
            <Radio value={'D'} onClick={onClick}>
              D
            </Radio>
          </Space>
        </Radio.Group>
      </div>
      <div>
        <Checkbox.Group>
          <Space direction="vertical">
            <Checkbox value={'A'} onClick={onClick}>
              A
            </Checkbox>
            <Checkbox value={'B'} onClick={onClick}>
              B
            </Checkbox>
            <Checkbox value={'C'} onClick={onClick}>
              C
            </Checkbox>
            <Checkbox value={'D'} onClick={onClick}>
              D
            </Checkbox>
          </Space>
        </Checkbox.Group>
      </div>
      <div>
        <DatePicker format={'YYYY-MM-DD'} onChange={onDateChange}></DatePicker>
      </div>
      <div></div>
    </div>
  );
}

export default loginForm;
