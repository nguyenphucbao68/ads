import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Box } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import { CCard, CCardBody } from '@coreui/react'
import { grey } from '@mui/material/colors'
import { GRID_DEFAULT_LOCALE_TEXT } from 'src/components/CustomGridLocale'
import CustomNoRowsOverlay from 'src/components/CustomNoRowsOverlay'
import CustomGridToolbar from 'src/components/CustomGridToolbar'
import { useNavigate } from 'react-router-dom'
import * as adsPanelService from 'src/services/adsPanel'

// Định nghĩa cấu trúc bảng
const columns = [
  { field: 'id', headerName: 'STT', width: 200 },
  {
    field: 'ads_panel_type',
    headerName: 'Loại',
    width: 200,
    valueGetter: (params) => params.row.ads_panel_type.name,
  },
  {
    field: 'height',
    headerName: 'Chiều cao',
    width: 200,
  },
  {
    field: 'width',
    headerName: 'Chiều rộng',
    width: 200,
  },
  {
    field: 'expire_date',
    headerName: 'Ngày hết hạn',
    flex: 1,
    valueFormatter: (params) => {
      const formattedDate = format(new Date(params.value), 'dd/MM/yyyy') // Format the date using date-fns
      return formattedDate
    },
  },
]

const AdsPanelList = () => {
  const [data, setData] = useState({
    loading: false,
    rows: [],
    totalRows: 0,
    pageSize: 25,
    page: 0,
  })

  const user = JSON.parse(localStorage.getItem('user'))

  const id = user?.role === 1 ? user?.district?.id : user?.role === 2 ? user?.ward?.id : null
  const role = user?.role

  const navigate = useNavigate()

  const navigateToDetail = (params) => {
    navigate(`/admin/ads_panels/${params.row.id}`)
  }

  const navigateToCreate = () => {
    navigate(`/admin/ads_panels/create`)
  }

  const init = async () => {
    setData((prevState) => ({ ...prevState, loading: true }))

    try {
      let rawData = await adsPanelService.getAll(id, role)

      setData((prevState) => ({
        ...prevState,
        rows: rawData || [],
        loading: false,
      }))
    } catch (err) {
      console.log(err.message)
      setData((prevState) => ({ ...prevState, loading: false }))
    }
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <CCard className="mb-4">
      <CCardBody>
        <h4 id="ads-panel-title" className="card-title mb-0">
          Quản lý bảng quảng cáo
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
              navigateToDetail(params)
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
                addNew: () => navigateToCreate(),
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

export default AdsPanelList
