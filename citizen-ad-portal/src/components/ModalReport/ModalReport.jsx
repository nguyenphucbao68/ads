import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  Flex,
  Typography,
  message,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useModalReport } from '../../contexts/ModalReportProvider';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadOutlined } from '@ant-design/icons';
import { updateLocalStorage } from '../../common/common';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const { Option } = Select;

function ModalReport() {
  const { state, onCloseModal } = useModalReport();
  const [form] = Form.useForm();
  const [reportTypes, setReportTypes] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

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

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  const onFinish = (values) => {
    setConfirmLoading(true);
    console.log({ ...values, current: editorRef.current.editor.getData() });

    let ads_panel_id;
    let longtitude;
    let latitude;
    let district_id;
    let ward_id;
    let address;

    if (state.adsPanelItem) {
      ads_panel_id = state.adsPanelItem.id;
      longtitude = state.adsPanelItem.ads_spot.longtitude;
      latitude = state.adsPanelItem.ads_spot.latitude;
    }

    if (state.locationDetail) {
      console.log({ locationDetail: state.locationDetail });
      longtitude = state.locationDetail.geometry.location.lng;
      latitude = state.locationDetail.geometry.location.lat;
      district_id = state.locationDetail.district_id;
      ward_id = state.locationDetail.ward_id;
      district_id = state.locationDetail.district_id;
    }
    const body = {
      ads_panel_id,
      ...values,
      image: JSON.stringify(values.image.map((item) => item.response.url)),
      longtitude,
      latitude,
      content: editorRef.current.editor.getData(),
    };

    axios({
      method: 'post',
      data: {
        ...body,
      },
      url: 'http://localhost:4000/v1/report/create',
    })
      .then(({ data }) => {
        console.log({ data });
        onCloseModal();
        messageApi.open({
          type: 'success',
          content: 'Gửi báo cáo thành công',
        });

        if (state.adsPanelItem) {
          updateLocalStorage(
            'reportedAdsSpot',
            state.adsPanelItem.ads_spot_id
          );
          updateLocalStorage('reportedAdsPanel', state.adsPanelItem.id);
        }
      })
      .catch((e) => {
        console.log(e.toJSON());

        messageApi.open({
          type: 'error',
          content: 'Gửi báo cáo thất bại!',
        });
      })
      .finally(() => setConfirmLoading(false));
    console.log({ state, body });
  };

  useEffect(() => {
    console.log('reset form');
    form.resetFields();
  }, [state.category]);

  // const checkFileUploaded = (rule, value, callback) => {
  //   // Kiểm tra xem có file đang được tải lên hay không
  //   if (!value || value.fileList.length === 0) {
  //     callback('Vui lòng tải lên ít nhất một ảnh!');
  //   } else {
  //     callback();
  //   }
  // };

  return (
    <>
      {contextHolder}
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
          <Form.Item label='Phân loại'>
            <Typography>
              <Typography.Text strong>{state.category}</Typography.Text>
            </Typography>
          </Form.Item>
          <Form.Item
            name='report_type_id'
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
            name='name'
            label='Họ tên'
            rules={[{ required: true, message: 'Vui lòng không để trống' }]}
          >
            <Input placeholder='Nhập họ tên người gửi' />
          </Form.Item>

          <Form.Item
            name='email'
            label='Email'
            rules={[{ required: true, message: 'Vui lòng không để trống' }]}
          >
            <Input placeholder='Nhập email người gửi' />
          </Form.Item>

          <Form.Item
            name='phone'
            label='Số điện thoại liên lạc'
            rules={[{ required: true, message: 'Vui lòng không để trống' }]}
          >
            <Input placeholder='Nhập số điện thoại người gửi' />
          </Form.Item>

          <Form.Item
            label={'Upload'}
            name={'image'}
            valuePropName='image'
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
            <Button loading={confirmLoading} type='primary' htmlType='submit'>
              Gửi
            </Button>
            <Button onClick={onCloseModal}>Huỷ</Button>
          </Flex>
        </Form>
      </Modal>
    </>
  );
}

export default ModalReport;