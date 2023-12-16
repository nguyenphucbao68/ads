import React, { useEffect, useState } from 'react'

import { Box, Checkbox } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import { CCard, CCardBody } from '@coreui/react'
import { grey } from '@mui/material/colors'
import { GRID_DEFAULT_LOCALE_TEXT } from 'src/components/CustomGridLocale'
import CustomNoRowsOverlay from 'src/components/CustomNoRowsOverlay'
import CustomGridToolbar from 'src/components/CustomGridToolbar'
import { useNavigate } from 'react-router-dom'

const URL = 'http://localhost:4000/v1/vhtt/ads-panel-types'
// Định nghĩa cấu trúc bảng
const columns = [
  { field: 'id', headerName: 'STT', width: 200 },
  {
    field: 'name',
    headerName: 'Tên loại bảng quảng cáo',
    flex: 1,
  },
]

const ReportTypeList = () => {
  const [data, setData] = useState({
    loading: false,
    rows: [], // TODO: Fetch rows vào đây để render
    totalRows: 0,
    pageSize: 25,
    page: 0,
  })

  const navigate = useNavigate()

  useEffect(() => {
    // Hàm fetch
    const fetchData = async () => {
      setData((prevState) => ({ ...prevState, loading: true }))

      try {
        let rawData = await fetch(URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        rawData = await rawData.json()
        global.console.log('rawData ', rawData)
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

    fetchData()
  }, [])

  return (
    <CCard className="mb-4">
      <CCardBody>
        <h4 id="ads-panel-type-title" className="card-title mb-0">
          Quản lý loại bảng quảng cáo
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
              // TODO: delete this

              navigate(`/admin/ads_spots/${params.row.id}`)
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

export default ReportTypeList
