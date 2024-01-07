import React, { useState } from 'react';
import { Button, Modal, Typography, Form, Input, Select, Space } from 'antd';
import { StyledCard } from './AdsPanel.styles';
import { InfoCircleOutlined, WarningFilled } from '@ant-design/icons';
import { useAdsPanelDetail } from '../../contexts/AdsPanelDetailProvider';
import { getFormattedAddress } from '../../common/common';

const { Paragraph, Text, Title } = Typography;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;

function AdsPanel({ adsPanelItem }) {
  const { onShowPanelDetail } = useAdsPanelDetail();
  const [form] = Form.useForm();

  const { ads_spot } = adsPanelItem;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onReportTypeChange = (value) => {};

  const onGenderChange = (value) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' });
        break;
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' });
        break;
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' });
        break;
      default:
    }
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({ note: 'Hello world!', gender: 'male' });
  };

  return (
    <StyledCard hoverable onClick={(e) => onShowPanelDetail(adsPanelItem)}>
      <Title level={3} style={{ margin: 0 }}>
        {/* Trụ, cụm pano */}
        {adsPanelItem.ads_panel_type.name}
      </Title>
      <Paragraph type='secondary'>
        {/* Đồng Khởi - Nguyễn Du (Sở Văn hoá và Thể thao), Phường Bến Nghé, Quận 1 */}
        {adsPanelItem.address}
        {getFormattedAddress(
          ads_spot.address,
          ads_spot.ward.name,
          ads_spot.district.name
        )}
      </Paragraph>
      <Paragraph style={{ margin: 0 }}>
        Kích thước: {+adsPanelItem.width.toFixed(1)}m x{' '}
        {+adsPanelItem.height.toFixed(1)}m
      </Paragraph>
      <Paragraph style={{ margin: 0 }}>
        Số lượng: <Text strong>1 trụ/bảng</Text>
      </Paragraph>
      <Paragraph style={{ margin: 0 }}>
        Hình thức: <Text strong>{ads_spot.ads_type.name}</Text>
      </Paragraph>
      <Paragraph>
        Phân loại: <Text strong>{ads_spot.spot_type.name}</Text>
      </Paragraph>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 32,
        }}
      >
        <InfoCircleOutlined
          twoToneColor='#eb2f96'
          style={{
            fontSize: 20,
            color: '#339dd8',
          }}
          onClick={onShowPanelDetail}
        />
        <Button
          danger
          onClick={(e) => {
            showModal();

            e.stopPropagation();
          }}
          icon={<WarningFilled />}
        >
          BÁO CÁO VI PHẠM
        </Button>
        <Modal
          title='BÁO CÁO VI PHẠM'
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={700}
        >
          <Form
            {...layout}
            form={form}
            name='control-hooks'
            onFinish={onFinish}
            style={{ maxWidth: 1200 }}
          >
            <Form.Item name='category' label='Phân loại'>
              <Input defaultValue={'Bảng quảng cáo'} disabled />
            </Form.Item>
            <Form.Item
              name='hinh_thuc_bao_cao'
              label='Hình thức báo cáo'
              rules={[{ required: true }]}
            >
              <Select
                placeholder='Chọn loại hình thức báo cáo'
                onChange={onGenderChange}
                allowClear
              >
                <Option value='Tố giác sai phạm'>Tố giác sai phạm</Option>
                <Option value='Đăng ký nội dung'>Đăng ký nội dung</Option>
                <Option value='Đóng góp ý kiến'>Đóng góp ý kiến</Option>
                <Option value='Giải đáp thắc mắc'>Giải đáp thắc mắc</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name='ten_nguoi_gui'
              label='Họ tên'
              rules={[{ required: true }]}
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
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.gender !== currentValues.gender
              }
            >
              {({ getFieldValue }) =>
                getFieldValue('gender') === 'other' ? (
                  <Form.Item
                    name='customizeGender'
                    label='Customize Gender'
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                ) : null
              }
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </StyledCard>
  );
}

export default AdsPanel;
