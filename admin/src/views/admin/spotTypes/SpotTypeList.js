import React, { useEffect, useState } from 'react'

import { Box } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import { CCard, CCardBody } from '@coreui/react'
import { grey } from '@mui/material/colors'
import { GRID_DEFAULT_LOCALE_TEXT } from 'src/components/CustomGridLocale'
import CustomNoRowsOverlay from 'src/components/CustomNoRowsOverlay'
import CustomGridToolbar from 'src/components/CustomGridToolbar'
import { useNavigate } from 'react-router-dom'
import * as spotTypeService from 'src/services/spotType'

// Định nghĩa cấu trúc bảng
const columns = [
  { field: 'id', headerName: 'STT', width: 200 },
  {
    field: 'name',
    headerName: 'Tên loại đất',
    flex: 1,
  },
]

const SpotTypeList = () => {
  const [data, setData] = useState({
    loading: false,
    rows: [], // TODO: Fetch rows vào đây để render
    totalRows: 0,
    pageSize: 25,
    page: 0,
  })

  const navigate = useNavigate()

  const navigateToDetail = (params) => {
    navigate(`/admin/spot_types/${params.row.id}`)
  }

  const navigateToCreate = () => {
    navigate(`/admin/spot_types/create`)
  }

  // Hàm fetch
  const init = async () => {
    setData((prevState) => ({ ...prevState, loading: true }))

    try {
      let rawData = await spotTypeService.getAll()
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
        <h4 id="ads-panel-type-title" className="card-title mb-0">
          Quản lý loại đất
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

export default SpotTypeList
