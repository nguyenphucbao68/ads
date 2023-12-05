import React, { useEffect, useState } from 'react'

import { Box, Button, Grid } from '@mui/material'
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid'
import { CCard, CCardBody } from '@coreui/react'
import { grey } from '@mui/material/colors'
import { GRID_DEFAULT_LOCALE_TEXT } from 'src/components/CustomGridLocale'
import { cilPen, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const fakeAdsSpots = [
  {
    id: 1,
    address: 'Đồng Khởi - Nguyễn Du (Sở Văn hoá và Thể thao), phường Bến Nghé, Quận 1',
    spotType: 'Đất công/Công viên/Hành lang an toàn giao thông',
    adsType: 'Cổ động chính trị',
    isAvailable: true,
  },
  {
    id: 2,
    address: 'Đồng Khởi - Nguyễn Du (Sở Văn hoá và Thể thao), phường Bến Nghé, Quận 1',
    spotType: 'Đất công/Công viên/Hành lang an toàn giao thông',
    adsType: 'Cổ động chính trị',
    isAvailable: true,
  },
  {
    id: 3,
    address: 'Đồng Khởi - Nguyễn Du (Sở Văn hoá và Thể thao), phường Bến Nghé, Quận 1',
    spotType: 'Đất công/Công viên/Hành lang an toàn giao thông',
    adsType: 'Cổ động chính trị',
    isAvailable: false,
  },
  {
    id: 4,
    address: 'Đồng Khởi - Nguyễn Du (Sở Văn hoá và Thể thao), phường Bến Nghé, Quận 1',
    spotType: 'Đất công/Công viên/Hành lang an toàn giao thông',
    adsType: 'Cổ động chính trị',
    isAvailable: false,
  },
  {
    id: 5,
    address: 'Đồng Khởi - Nguyễn Du (Sở Văn hoá và Thể thao), phường Bến Nghé, Quận 1',
    spotType: 'Đất công/Công viên/Hành lang an toàn giao thông',
    adsType: 'Cổ động chính trị',
    isAvailable: true,
  },
  {
    id: 6,
    address: 'Đồng Khởi - Nguyễn Du (Sở Văn hoá và Thể thao), phường Bến Nghé, Quận 1',
    spotType: 'Đất công/Công viên/Hành lang an toàn giao thông',
    adsType: 'Cổ động chính trị',
    isAvailable: true,
  },
  {
    id: 7,
    address: 'Đồng Khởi - Nguyễn Du (Sở Văn hoá và Thể thao), phường Bến Nghé, Quận 1',
    spotType: 'Đất công/Công viên/Hành lang an toàn giao thông',
    adsType: 'Cổ động chính trị',
    isAvailable: true,
  },
  {
    id: 8,
    address: 'Đồng Khởi - Nguyễn Du (Sở Văn hoá và Thể thao), phường Bến Nghé, Quận 1',
    spotType: 'Đất công/Công viên/Hành lang an toàn giao thông',
    adsType: 'Cổ động chính trị',
    isAvailable: true,
  },
  {
    id: 9,
    address: 'Đồng Khởi - Nguyễn Du (Sở Văn hoá và Thể thao), phường Bến Nghé, Quận 1',
    spotType: 'Đất công/Công viên/Hành lang an toàn giao thông',
    adsType: 'Cổ động chính trị',
    isAvailable: true,
  },
  {
    id: 10,
    address: 'Đồng Khởi - Nguyễn Du (Sở Văn hoá và Thể thao), phường Bến Nghé, Quận 1',
    spotType: 'Đất công/Công viên/Hành lang an toàn giao thông',
    adsType: 'Cổ động chính trị',
    isAvailable: true,
  },
  {
    id: 11,
    address: 'Đường Nguyễn Văn Linh, phường Tân Thuận Tây, Quận 7',
    spotType: 'Đất công/Công viên/Hành lang an toàn giao thông',
    adsType: 'Bảng hiệu',
    isAvailable: true,
  },
  {
    id: 12,
    address: 'Đường Nguyễn Văn Linh, phường Tân Thuận Tây, Quận 7',
    spotType: 'Đất công/Công viên/Hành lang an toàn giao thông',
    adsType: 'Bảng hiệu',
    isAvailable: true,
  },
  {
    id: 13,
    address: 'Đường Nguyễn Văn Linh, phường Tân Thuận Tây, Quận 7',
    spotType: 'Đất công/Công viên/Hành lang an toàn giao thông',
    adsType: 'Bảng hiệu',
    isAvailable: true,
  },
  {
    id: 14,
    address: 'Đường Nguyễn Văn Linh, phường Tân Thuận Tây, Quận 7',
    spotType: 'Đất công/Công viên/Hành lang an toàn giao thông',
    adsType: 'Bảng hiệu',
    isAvailable: true,
  },
  {
    id: 15,
    address: 'Đường Nguyễn Văn Linh, phường Tân Thuận Tây, Quận 7',
    spotType: 'Đất công/Công viên/Hành lang an toàn giao thông',
    adsType: 'Bảng hiệu',
    isAvailable: true,
  },
  {
    id: 16,
    address: 'Đường Nguyễn Văn Linh, phường Tân Thuận Tây, Quận 7',
    spotType: 'Đất công/Công viên/Hành lang an toàn giao thông',
    adsType: 'Bảng hiệu',
    isAvailable: true,
  },
]

const AdsSpotList = () => {
  const [adsSpots, setAdsSpots] = useState(fakeAdsSpots)

  useEffect(() => {}, [])

  const [pageSize, setPageSize] = useState(25)
  const [page, setPage] = useState(0)

  const columns = [
    { field: 'id', headerName: 'STT', width: 50 },
    {
      field: 'address',
      headerName: 'Địa điểm',
      width: 340,
    },
    {
      field: 'spotType',
      headerName: 'Loại vị trí',
      width: 340,
    },
    {
      field: 'adsType',
      headerName: 'Hình thức quảng cáo',
      width: 200,
    },
    {
      field: 'isAvailable',
      headerName: 'Đã quy hoạch',
      width: 150,
      type: 'boolean',
      sortable: false,
      renderCell: (cellValues) => {
        return (
          <Box
            sx={{
              bgcolor: cellValues.row.isAvailable ? 'success.main' : 'error.main',
              borderRadius: '5px',
              color: 'white',
              textAlign: 'center',
              padding: '5px',
            }}
          >
            {cellValues.row.isAvailable ? 'Đã quy hoạch' : 'Chưa quy hoạch'}
          </Box>
        )
      },
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      type: 'actions',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              flex={1}
              startIcon={<CIcon icon={cilPen} />}
              onClick={() => console.log(params.row.id)}
            >
              Sửa
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              color="error"
              size="small"
              flex={1}
              startIcon={<CIcon icon={cilTrash} />}
              onClick={() => console.log(params.row.id)}
            >
              Xóa
            </Button>
          </Grid>
        </Grid>
      ),
    },
  ]

  return (
    <CCard className="mb-4">
      <CCardBody>
        <h4 id="ads-spots-title" className="card-title mb-0">
          Quản lý điểm đặt quảng cáo
        </h4>
        <Box
          sx={{
            height: 'calc(100vh - 300px)',
            width: '100%',
            marginTop: '15px',
          }}
        >
          <DataGrid
            columns={columns}
            rows={adsSpots}
            sx={{
              [`& .${gridClasses.row}`]: {
                bgcolor: (theme) => (theme.palette.mode === 'light' ? grey[200] : grey[900]),
              },
              // disable cell selection style
              '.MuiDataGrid-cell:focus': {
                outline: 'none',
              },
              // pointer cursor on ALL rows
              '& .MuiDataGrid-row:hover': {
                cursor: 'pointer',
              },
            }}
            getRowHeight={() => 'auto'}
            getRowId={(row) => row.id}
            rowSelection={false}
            onRowClick={(params) => {
              console.log(params.row.id)
            }}
            paginationModel={{ page, pageSize }}
            onPaginationModelChange={(params) => {
              setPage(params.page)
              setPageSize(params.pageSize)
            }}
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : 5,
              bottom: params.isLastVisible ? 0 : 5,
            })}
            slots={{ toolbar: GridToolbar }}
            localeText={GRID_DEFAULT_LOCALE_TEXT}
          />
        </Box>
      </CCardBody>
    </CCard>
  )
}

export default AdsSpotList
