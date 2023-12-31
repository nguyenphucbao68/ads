import React, { useState } from 'react';
import { Button } from 'antd';
import { StyledCard } from './AdsPanel.styles';
import { InfoCircleOutlined } from '@ant-design/icons';
import { WarningFilled } from '@ant-design/icons';
import { useAdsPanelDetail } from '../../contexts/AdsPanelDetailProvider';

function AdsPanel() {
  const { onShowPanelDetail } = useAdsPanelDetail();

  return (
    <StyledCard hoverable onClick={onShowPanelDetail}>
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
          style={{
            fontSize: 20,
            color: '#339dd8',
          }}
          onClick={onShowPanelDetail}
        />
        <Button danger onClick={(e) => e.stopPropagation()}>
          <WarningFilled />
          BÁO CÁO VI PHẠM
        </Button>
      </div>
    </StyledCard>
  );
}

export default AdsPanel;
