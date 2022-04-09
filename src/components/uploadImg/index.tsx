import React, { useState, useEffect } from 'react';
import { Upload, message } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';

function UploadImg(props) {
  const { value, onChange } = props;
  const [fileList, setFileList] = useState([]);
  const [imgLoading, setimgLoading] = useState(false);
  //限制图片大小
  const beforeUpload = (file: { type: string; size: number }) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只允许上传JPG/PNG格式的图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小必须小于2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  // useEffect(() => {
  //   if (value) {
  //     setFileList([
  //       {
  //         thumbUrl: '图片访问的baseURL' + value,
  //       },
  //     ]);
  //   }
  // }, [value]);

  useEffect(() => {
    // 解决Form.Item的双向绑定问题
    if (fileList.length > 0) {
      const file = fileList[0];
      // 当图片真正上传成功后，把图片的可访问地址返回给父组件
      if (file.response) {
        // console.log('file', file)
        // 把fileList中img回传给父组件进行双向绑定
        onChange(file.response.url);
        setimgLoading(false);
      }
    }
  }, [fileList]);
  const imgChange = (ev) => {
    // console.log('ev fileList', ev.fileList)
    // console.log(fileList);
    setimgLoading(true);
    setFileList([...ev.fileList]);
  };
  return (
    <Upload
      name="avatar"
      accept="image/*"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="http://127.0.0.1:7001/upload"
      onChange={imgChange}
      beforeUpload={beforeUpload}
      fileList={fileList}
      maxCount={1}
    >
      {value ? (
        <img src={value} alt="avatar" style={{ width: '100%' }} />
      ) : (
        <div>
          {imgLoading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>上传图片</div>
        </div>
      )}
    </Upload>
  );
}

export default UploadImg;
