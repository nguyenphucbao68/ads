import { Col, Row, Typography } from 'antd';
import React from 'react';
import { LeftOutlined } from '@ant-design/icons';
const { Paragraph, Link } = Typography;

function ReportListItem({ goBack }) {
  return (
    <React.Fragment>
      <Row gutter={10} style={{ marginTop: '20px' }}>
        <Col span={7}>
          <Paragraph strong>Phân loại:</Paragraph>
        </Col>
        <Col>Biển báo cáo</Col>
      </Row>
      <Row gutter={10}>
        <Col span={7}>
          <Paragraph strong>Họ tên:</Paragraph>
        </Col>
        <Col>Trần Thiện Tiến</Col>
      </Row>
      <Row gutter={10}>
        <Col span={7}>
          <Paragraph strong>Email:</Paragraph>
        </Col>
        <Col>thien.tien151</Col>
      </Row>
      <Row gutter={10}>
        <Col span={7}>
          <Paragraph strong>Số điện thoại:</Paragraph>
        </Col>
        <Col>09012312312</Col>
      </Row>
      <Row gutter={10}>
        <Col span={7}>
          <Paragraph strong>Hình ảnh</Paragraph>
        </Col>
        <Col>Biển báo cáo</Col>
      </Row>
      <Row gutter={10}>
        <Col span={7}>
          <Paragraph strong>Nội dung báo cáo:</Paragraph>
        </Col>
        <Col>Biển báo cáo</Col>
      </Row>
      <Link onClick={goBack}>
        <LeftOutlined /> Quay lại
      </Link>
    </React.Fragment>
  );
}

export default ReportListItem;
