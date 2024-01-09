import { Button, Modal, Form, Input, Select, Upload, Flex } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useModalReport } from '../../contexts/ModalReportProvider';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadOutlined } from '@ant-design/icons';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const { Option } = Select;

function ModalReport() {
  const { state, onCloseModal } = useModalReport();
  const onFinish = (values) => {
    console.log({ ...values, current: editorRef.current.editor.getData() });
  };

  const [form] = Form.useForm();
  const [reportTypes, setReportTypes] = useState([]);

  const cloudName = 'dzjaj79nw';
  const uploadPreset = 'u4mszkqu';

  const customRequest = async ({ file, onSuccess, onError, onProgress }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress({ percent: percentCompleted });
          },
        }
      );

      onSuccess({ url: response.data.url });
      console.log('Image URL:', response.data.url);
    } catch (error) {
      console.log('Error uploading image to Cloudinary', error);
    }
  };

  const editorRef = useRef();

  //   const [previewOpen, setPreviewOpen] = useState(false);
  //   const [previewImage, setPreviewImage] = useState('');
  //   const [previewTitle, setPreviewTitle] = useState('');

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  useEffect(() => {
    // fetch report types
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_ADS_REPORT_URI}/types`,
      responseType: 'json',
    }).then(({ data }) => {
      setReportTypes(data);
    });
  }, []);

  return (
    <Modal
      title='BÁO CÁO VI PHẠM'
      open={state.isOpenModal}
      onOk={onCloseModal}
      onCancel={onCloseModal}
      width={700}
      footer={null}
    >
      <Form
        {...layout}
        form={form}
        name='control-hooks'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ maxWidth: 1200 }}
        autoComplete='off'
      >
        <Form.Item
          name='category'
          label='Phân loại'
          initialValue={state.category}
        >
          <Input defaultValue={state.category} disabled />
        </Form.Item>
        <Form.Item
          name='hinh_thuc_bao_cao'
          label='Hình thức báo cáo'
          rules={[{ required: true, message: 'Vui lòng không để trống' }]}
        >
          <Select placeholder='Chọn loại hình thức báo cáo' allowClear>
            {reportTypes.map((reportType) => (
              <Option key={reportType.id} value={reportType.id}>
                {reportType.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name='ten_nguoi_gui'
          label='Họ tên'
          rules={[{ required: true, message: 'Vui lòng không để trống' }]}
        >
          <Input placeholder='Nhập họ tên người gửi' />
        </Form.Item>

        <Form.Item name='email' label='Email'>
          <Input placeholder='Nhập email người gửi' />
        </Form.Item>

        <Form.Item name='so_dien_thoai' label='Số điện thoại liên lạc'>
          <Input placeholder='Nhập số điện thoại người gửi' />
        </Form.Item>

        <Form.Item
          label={'Upload'}
          name={'fileList'}
          valuePropName='fileList'
          getValueFromEvent={normFile}
        >
          <Upload
            customRequest={customRequest}
            listType='picture-card'
            maxCount={2}
            multiple
          >
            <button
              style={{
                border: 0,
                background: 'none',
              }}
              type='button'
            >
              <UploadOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </Upload>
        </Form.Item>

        {/* <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
        //   onCancel={handleCancel}
        >
          <img
            alt='example'
            style={{
              width: '100%',
            }}
            src={previewImage}
          />
        </Modal> */}

        <div style={{ marginTop: 20 }}>
          <CKEditor id='content' ref={editorRef} editor={ClassicEditor} />
        </div>

        <Flex
          justify='flex-end'
          align='center'
          gap={10}
          style={{ marginTop: '20px' }}
        >
          <Button type='primary' htmlType='submit'>
            Gửi
          </Button>
          <Button onClick={onCloseModal}>Huỷ</Button>
        </Flex>
      </Form>
    </Modal>
  );
}

export default ModalReport;
