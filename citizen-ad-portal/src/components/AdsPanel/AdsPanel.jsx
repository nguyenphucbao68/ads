import React from 'react';
import { Button, Typography } from 'antd';
import { StyledCard } from './AdsPanel.styles';
import { InfoCircleOutlined, WarningFilled } from '@ant-design/icons';
import { useAdsPanelDetail } from '../../contexts/AdsPanelDetailProvider';

const { Paragraph, Text, Title } = Typography;

function AdsPanel() {
  const { onShowPanelDetail } = useAdsPanelDetail();

  return (
    <StyledCard hoverable onClick={onShowPanelDetail}>
      <Title level={3} style={{ margin: 0 }}>
        Trụ, cụm pano
      </Title>
      <Paragraph type='secondary'>
        Đồng Khởi - Nguyễn Du (Sở Văn hoá và Thể thao), Phường Bến Nghé, Quận 1
      </Paragraph>
      <Paragraph style={{ margin: 0 }}>Kích thước: 2.5m x 10m</Paragraph>
      <Paragraph style={{ margin: 0 }}>
        Số lượng: <Text strong>1 trụ/bảng</Text>
      </Paragraph>
      <Paragraph style={{ margin: 0 }}>
        Hình thức: <Text strong>Cổ động chính trị</Text>
      </Paragraph>
      <Paragraph>
        Phân loại: <Text strong>Đất công/công viên/Hành lang an toàn</Text>
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
          onClick={(e) => e.stopPropagation()}
          icon={<WarningFilled />}
        >
          BÁO CÁO VI PHẠM
        </Button>
      </div>
    </StyledCard>
  );
}

export default AdsPanel;
