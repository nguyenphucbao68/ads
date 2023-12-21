import { Card } from 'antd'
import React from 'react'

function LocationDetail() {
  return (
    <Card cover={'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'}>
      <p>Trụ, cụm pano</p>
      <p>
        Đồng Khởi - Nguyễn Du (Sở Văn hoá và Thể thao), Phường Bến Nghé, Quận 1
      </p>
      <p>Kích thước: 2.5m x 10m</p>
      <p>Số lượng: 1 trụ/bảng</p>
      <p>Hình thức: Cổ động chính trị</p>
      <p>Phân loại: Đất công/công viên/Hành lang an toàn</p>
      <p>Ngày hết hạn hợp đồng: 25/12/2023</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button danger>BÁO CÁO VI PHẠM</Button>
      </div>
    </Card>
  );
}

export default LocationDetail