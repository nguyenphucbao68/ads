import React, { useEffect, useState } from 'react'

import { Box, Button, Grid, Checkbox } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import { CCard, CCardBody } from '@coreui/react'
import { grey } from '@mui/material/colors'
import { GRID_DEFAULT_LOCALE_TEXT } from 'src/components/CustomGridLocale'
import { cilPen, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import CustomNoRowsOverlay from 'src/components/CustomNoRowsOverlay'
import CustomGridToolbar from 'src/components/CustomGridToolbar'

const columns = [
  { field: 'id', headerName: 'STT', width: 50 },
  {
    field: 'address',
    headerName: 'Địa điểm',
    width: 340,
  },
  {
    field: 'spot_type_name',
    headerName: 'Loại vị trí',
    width: 340,
    renderCell: (cellValues) => {
      const spotType = cellValues.row['spot_type']
      return <span>{spotType.name}</span>
    },
  },
  {
    field: 'ads_type_name',
    headerName: 'Hình thức quảng cáo',
    width: 200,
    renderCell: (cellValues) => {
      const adsType = cellValues.row['ads_type']
      return <span>{adsType.name}</span>
    },
  },
  {
    field: 'is_available',
    headerName: 'Đã quy hoạch',
    width: 150,
    type: 'boolean',
    sortable: false,
    renderCell: (cellValues) => {
      return (
        <Checkbox
          checked={cellValues.row.is_available}
          color={cellValues.row.is_available ? 'success' : 'error'}
        />
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

const AdsSpotList = () => {
  const [data, setData] = useState({
    loading: false,
    rows: [],
    totalRows: 0,
    pageSize: 25,
    page: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      setData((prevState) => ({ ...prevState, loading: true }))
      fetch('http://localhost:4000/v1/vhtt/ads-spots')
        .then((rawData) => rawData.json())
        .then((data) => {
          setData((prevState) => ({
            ...prevState,
            rows: data['data'] || [],
            loading: false,
          }))
        })
        .catch((err) => {
          console.log(err.message)
          setData((prevState) => ({ ...prevState, loading: false }))
        })
    }

    fetchData()
  }, [])

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
            sx={{
              [`& .${gridClasses.cell}`]: {
                ':focus': {
                  outline: 'none',
                },
              },
              [`& .${gridClasses.row}`]: {
                bgcolor: (theme) => (theme.palette.mode === 'light' ? grey[200] : grey[900]),
                ':hover': {
                  cursor: 'pointer',
                },
              },
            }}
            columns={columns}
            rows={data.rows}
            loading={data.loading}
            getRowHeight={() => 'auto'}
            getRowId={(row) => row.id}
            rowSelection={false}
            onRowClick={(params) => {
              // TODO: handle row click
              console.log(params.row.id)
            }}
            paginationModel={{ page: data.page, pageSize: data.pageSize }}
            onPaginationModelChange={(params) => {
              setData((prevState) => ({
                ...prevState,
                page: params.page,
                pageSize: params.pageSize,
              }))
            }}
            slots={{
              toolbar: CustomGridToolbar,
              noRowsOverlay: CustomNoRowsOverlay,
            }}
            slotProps={{
              toolbar: {
                // TODO: handle add new button click
                addNew: () => console.log('GO TO ADD NEW PAGE'),
              },
            }}
            localeText={GRID_DEFAULT_LOCALE_TEXT}
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : 5,
              bottom: params.isLastVisible ? 0 : 5,
            })}
          />
        </Box>
      </CCardBody>
    </CCard>
  )
}

export default AdsSpotList
