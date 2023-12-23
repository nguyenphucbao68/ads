import React from 'react';
import { Card, Typography } from 'antd';
import { StyledCard } from './AdsPanelDetail.style';
const { Title, Text } = Typography;

function AdsPanelDetail(props) {
  return (
    <StyledCard>
      <img
        width={200}
        height={200}
        src='https://prviet.vn/ImageUpload/userfiles/images/HINH-TONG-HOP/thiet-ke-thi-cong-pano-quang-cao-ngoai-troi-pano-cot-bien-thiet-ke-quang-cao-prviet-02.jpg'
        alt='Hình ảnh bảng quảng cáo'
      />
      <Title level={5}>Làm Bảng Hiệu - Quảng cáo An Phát, Hồ Chí Minh</Title>
      <Text level={5}>Trụ, cụm pano</Text>
      <Text level={5}>Ngày hết hạn: 12/12/2023</Text>
      <Text level={5}>
        Đồng Khởi - Nguyễn Du (Sở Văn hoá và Thể thao), Phường Bến Nghé, Quận 1
      </Text>
      <Text level={5}>Kích thước: 2.5m x 10m</Text>
      <Text level={5}> Số lượng: 1 trụ/bảng</Text>
      <Text level={5}>Hình thức: Cổ động chính trị</Text>
      <Text level={5}>Phân loại: Đất công/công viên/Hành lang an toàn</Text>
    </StyledCard>
  );
}

export default AdsPanelDetail;
