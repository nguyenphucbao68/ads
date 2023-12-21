import React from 'react';
import { Button } from 'antd';
import { StyledCard } from './AdsPanel.styles';
import { InfoCircleOutlined } from '@ant-design/icons';

function AdsPanel() {
  return (
    <StyledCard style={{ width: 300 }}>
      <p>Trụ, cụm pano</p>
      <p>
        Đồng Khởi - Nguyễn Du (Sở Văn hoá và Thể thao), Phường Bến Nghé, Quận 1
      </p>
      <p>Kích thước: 2.5m x 10m</p>
      <p>Số lượng: 1 trụ/bảng</p>
      <p>Hình thức: Cổ động chính trị</p>
      <p>Phân loại: Đất công/công viên/Hành lang an toàn</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <InfoCircleOutlined twoToneColor='#eb2f96' />
        <Button danger>BÁO CÁO VI PHẠM</Button>
      </div>
    </StyledCard>
  );
}

export default AdsPanel;
