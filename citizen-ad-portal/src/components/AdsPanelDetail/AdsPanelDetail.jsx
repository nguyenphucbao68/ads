import React from 'react';
import { StyledCard } from '../AdsPanel/AdsPanel.styles';
import { Typography } from 'antd';

const { Title, Text } = Typography;

function AdsPanelDetail(props) {
  return (
    <StyledCard>
      <Title level={5}>Thông tin bảng quảng cáo</Title>
      <Text>Chưa có dữ liệu</Text>
      <Text>Vui lòng chọn điểm trên bản đồ để xem</Text>
    </StyledCard>
  );
}

export default AdsPanelDetail;
