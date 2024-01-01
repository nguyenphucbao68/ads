import React from 'react';
import { StyledCard } from './AdsPanelInfo.style';
import { Flex, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

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
            <Text strong>
              {!adsPannelInfo ? 'Chưa có dữ liệu' : adsPannelInfo.ads_type.name}
            </Text>
          </Paragraph>
          <Paragraph style={{ margin: 0 }}>
            {!adsPannelInfo
              ? 'Vui lòng chọn điểm trên bản đồ để xem'
              : `Số lượng bảng quảng cáo: ${adsPannelInfo.adsPanelCount}`}
          </Paragraph>
          <Paragraph>
            {adsPannelInfo && (
              <React.Fragment>
                Tình trạng:{' '}
                {
                  <Text strong italic>
                    {adsPannelInfo.is_available
                      ? 'ĐÃ QUY HOẠCH'
                      : 'CHƯA QUY HOẠCH'}
                  </Text>
                }
              </React.Fragment>
            )}
          </Paragraph>
        </div>
      </Flex>
    </StyledCard>
  );
}

export default AdsPanelInfo;
