import { Button, Col, Flex, List, Modal, Row, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Container } from './ReportList.style';
import {
  UnorderedListOutlined,
  AimOutlined,
  RightOutlined,
  LeftOutlined,
  PushpinOutlined,
  EnvironmentOutlined,
  ExceptionOutlined,
} from '@ant-design/icons';
import ReportListItem from '../ReportListItem/ReportListItem';
import moment from 'moment';
import { getFormattedAddress } from '../../common/common';
const { Paragraph, Title, Link } = Typography;

function ReportList() {
  const [showModalReport, setShowModalReport] = useState(false);
  const [viewDetailMode, setViewDetailMode] = useState(null);
  const [onHover, setOnHover] = useState(false);
  const [reports, setReports] = useState([]);
  const [current, setCurrent] = useState(1);

  const handleOk = () => {
    setShowModalReport(false);
  };

  const handleCancel = () => {
    setShowModalReport(false);
  };

  useEffect(() => {
    setReports(JSON.parse(localStorage.getItem('reports') || '[]'));
  }, [showModalReport]);

  const onModalReportOpen = () => {
    setShowModalReport(true);
    setReports(JSON.parse(localStorage.getItem('reports') || '[]'));
    setCurrent(1);
    setViewDetailMode(null);
  };

  return (
    <Container>
      <Button
        onMouseOver={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        shape={onHover ? 'round' : 'circle'}
        icon={<UnorderedListOutlined />}
        onClick={onModalReportOpen}
      >
        {onHover ? 'Xem lại các báo cáo vi phạm' : ''}
      </Button>
      <Modal
        width={600}
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
              onChange: (page) => setCurrent(page),
              pageSize: 2,
              defaultCurrent: 1,
              current,
            }}
            dataSource={reports}
            renderItem={(item, idx) =>
              item.adsPanelItem ? (
                <List.Item key={idx}>
                  <Flex style={{ width: '100%' }} align='center' gap={10}>
                    <ExceptionOutlined style={{ fontSize: 34 }} />
                    <Flex vertical style={{ width: '70%' }}>
                      <Title level={5}>
                        {'Phân loại: Báo cáo bảng quảng cáo'}
                      </Title>
                      <Paragraph>
                        {'Loại vị trí: ' +
                          item.adsPanelItem.ads_spot.spot_type.name}
                      </Paragraph>
                      <Paragraph>
                        {'Loại bảng quảng cáo: ' +
                          item.adsPanelItem.ads_panel_type.name}
                      </Paragraph>
                      <Paragraph>
                        {'Địa chỉ: ' +
                          getFormattedAddress(
                            item.adsPanelItem.ads_spot.address,
                            item.adsPanelItem.ads_spot.ward.name,
                            item.adsPanelItem.ads_spot.district.name
                          )}
                      </Paragraph>
                      <Paragraph>{'Ngày gửi: ' + item.sendDate}</Paragraph>
                    </Flex>
                    <Link
                      style={{ marginLeft: 'auto' }}
                      onClick={() =>
                        setViewDetailMode({
                          ...item,
                          reportCategory: item.adsPanelItem
                            ? 'Bảng quảng cáo'
                            : 'Địa điểm',
                        })
                      }
                    >
                      Xem chi tiết <RightOutlined />{' '}
                    </Link>
                  </Flex>
                </List.Item>
              ) : (
                <List.Item key={idx}>
                  <Flex style={{ width: '100%' }} align='center' gap={10}>
                    <EnvironmentOutlined style={{ fontSize: 34 }} />
                    <Flex vertical style={{ width: '70%' }}>
                      <Title level={5}>{'Phân loại: Báo cáo địa điểm'}</Title>
                      <Paragraph>
                        {'Địa chỉ: ' + item.locationDetail.formatted_address}
                      </Paragraph>
                      <Paragraph>{'Ngày gửi: ' + item.sendDate}</Paragraph>
                    </Flex>
                    <Link
                      style={{ marginLeft: 'auto' }}
                      onClick={() =>
                        setViewDetailMode({
                          ...item,
                          reportCategory: 'Địa điểm',
                        })
                      }
                    >
                      Xem chi tiết <RightOutlined />{' '}
                    </Link>
                  </Flex>
                </List.Item>
              )
            }
          />
        ) : (
          <ReportListItem
            goBack={() => setViewDetailMode(null)}
            item={viewDetailMode}
          />
        )}
      </Modal>
    </Container>
  );
}

export default ReportList;
