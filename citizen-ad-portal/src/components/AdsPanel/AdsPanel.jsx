import React, { useState } from 'react';
import { Button } from 'antd';
import { StyledCard } from './AdsPanel.styles';
import { InfoCircleOutlined } from '@ant-design/icons';
import AdsPanelDetail from '../AdsPanelDetail/AdsPanelDetail';
import { WarningFilled } from '@ant-design/icons';

function AdsPanel() {
  const [viewAdsPanelDetail, setViewAdsPanelDetail] = useState(false);

  const onViewAdsPanelDetail = () => {
    setViewAdsPanelDetail(!viewAdsPanelDetail);
  };

  return (
    <StyledCard
      style={{ width: 300 }}
      bodyStyle={{ backgroundColor: '#ca5c5cF' }}
    >
      <p>Trụ, cụm pano</p>
      <p>
        Đồng Khởi - Nguyễn Du (Sở Văn hoá và Thể thao), Phường Bến Nghé, Quận 1
      </p>
      <p>Kích thước: 2.5m x 10m</p>
      <p>Số lượng: 1 trụ/bảng</p>
      <p>Hình thức: Cổ động chính trị</p>
      <p>Phân loại: Đất công/công viên/Hành lang an toàn</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <InfoCircleOutlined
          twoToneColor='#eb2f96'
          onClick={onViewAdsPanelDetail}
        />
        <Button danger>
          <WarningFilled />
          BÁO CÁO VI PHẠM
        </Button>
      </div>

      {viewAdsPanelDetail && <AdsPanelDetail />}
    </StyledCard>
  );
}

export default AdsPanel;
