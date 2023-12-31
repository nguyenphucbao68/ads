import React from 'react';
import { StyledCard } from './AdsPanelInfo.style';
import { Flex, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function AdsPanelInfo({ adsPannelInfo }) {
  return (
    <StyledCard>
      <Flex gap={10}>
        <div
          style={{
            paddingTop: 2,
          }}
        >
          <InfoCircleOutlined
            style={{
              fontSize: 16,
            }}
          />
        </div>
        <div>
          <Title level={5} style={{ margin: 0, marginBottom: 10 }}>
            Thông tin bảng quảng cáo
          </Title>
          <Paragraph strong style={{ margin: 0 }}>
            {adsPannelInfo && 'Chưa có dữ liệu'}
          </Paragraph>
          <Paragraph>
            {!adsPannelInfo && 'Vui lòng chọn điểm trên bản đồ để xem'}
          </Paragraph>
        </div>
      </Flex>
    </StyledCard>
  );
}

export default AdsPanelInfo;
