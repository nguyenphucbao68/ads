import React from 'react';
import { Button, Typography } from 'antd';
import { StyledCard } from './AdsPanel.styles';
import { InfoCircleOutlined, WarningFilled } from '@ant-design/icons';
import { useAdsPanelDetail } from '../../contexts/AdsPanelDetailProvider';
import { getFormattedAddress } from '../../common/common';

import ModalReport from '../ModalReport/ModalReport';
import { useModalReport } from '../../contexts/ModalReportProvider';
const { Paragraph, Text, Title } = Typography;

function AdsPanel({ adsPanelItem }) {
  const { onShowPanelDetail } = useAdsPanelDetail();
  const { dispatch } = useModalReport();

  const { ads_spot } = adsPanelItem;

  const showModal = () => {
    dispatch({
      type: 'ON_OPEN_MODAL',
      payload: {
        category: 'Biển quảng cáo',
      },
    });
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
        <ModalReport />
      </div>
    </StyledCard>
  );
}

export default AdsPanel;
