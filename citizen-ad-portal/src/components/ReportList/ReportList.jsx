import { Button, Col, Flex, List, Modal, Row, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Container } from './ReportList.style';
import {
  UnorderedListOutlined,
  AimOutlined,
  RightOutlined,
  LeftOutlined,
} from '@ant-design/icons';
import ReportListItem from '../ReportListItem/ReportListItem';
import moment from 'moment';
const { Paragraph, Title, Link } = Typography;

function ReportList() {
  const [showModalReport, setShowModalReport] = useState(false);
  const [viewDetailMode, setViewDetailMode] = useState(false);
  const [onHover, setOnHover] = useState(false);
  const [reports, getReports] = useState(() =>
    JSON.parse(localStorage.getItem('reports') || '[]')
  );

  const handleOk = () => {
    setShowModalReport(false);
  };

  const handleCancel = () => {
    setShowModalReport(false);
  };

  useEffect(() => {
    console.log({ reports });
  }, [reports]);

  return (
    <Container>
      <Button
        onMouseOver={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        shape={onHover ? 'round' : 'circle'}
        icon={<UnorderedListOutlined />}
        onClick={() => setShowModalReport(true)}
      >
        {onHover ? 'Xem lại các báo cáo vi phạm' : ''}
      </Button>
      <Modal
        title={
          viewDetailMode
            ? 'XEM CHI TIẾT BÁO CÁO VI PHẠM'
            : 'XEM LẠI BÁO CÁO VI PHẠM'
        }
        footer={null}
        open={showModalReport}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {!viewDetailMode ? (
          <List
            pagination={{
              position: 'bottom',
              align: 'center',
              onChange: (page) => console.log({ page }),
              pageSize: 3,
            }}
          >
            <List.Item>
              <Flex style={{ width: '100%' }} align='center' gap={10}>
                <AimOutlined style={{ fontSize: 34 }} />
                <Flex vertical>
                  <Title level={5}>Phân loại: Báo cáo bảng quảng cáo</Title>
                  <Paragraph>Tên: Trụ cụm Panel</Paragraph>
                  <Paragraph>
                    Địa chỉ: 411 Hưnsadadasdasdasdasdasdg phú
                  </Paragraph>
                  <Paragraph>Ngày gửi: 13/5/2023</Paragraph>
                </Flex>
                <Link
                  style={{ marginLeft: 'auto' }}
                  onClick={() => setViewDetailMode(true)}
                >
                  Xem chi tiết <RightOutlined />{' '}
                </Link>
              </Flex>
            </List.Item>
          </List>
        ) : (
          <ReportListItem goBack={() => setViewDetailMode(false)} />
        )}
      </Modal>
    </Container>
  );
}

export default ReportList;
