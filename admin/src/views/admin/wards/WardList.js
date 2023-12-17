import React, { useEffect, useContext } from 'react'

import { Box } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import { CCard, CCardBody } from '@coreui/react'
import { grey } from '@mui/material/colors'
import { GRID_DEFAULT_LOCALE_TEXT } from 'src/components/CustomGridLocale'
import CustomNoRowsOverlay from 'src/components/CustomNoRowsOverlay'
import CustomGridToolbar from 'src/components/CustomGridToolbar'
import { useNavigate } from 'react-router-dom'
import { WardContext } from 'src/contexts/WardProvider'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const columns = [
  { field: 'id', headerName: 'STT', width: 70 },
  {
    field: 'name',
    headerName: 'Tên phường/xã',
    flex: 3,
  },
  {
    field: 'district_name',
    headerName: 'Quận/huyện',
    flex: 1,
    renderCell: (cellValues) => {
      const district = cellValues.row['district']
      return <span>{district.name}</span>
    },
  },
]

const WardList = () => {
  const { wards, dispatchWards } = useContext(WardContext)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      dispatchWards({ type: 'TURN_ON_LOADING' })
      fetch(`${BACKEND_URL}/vhtt/wards`)
        .then((rawData) => rawData.json())
        .then((data) => {
          dispatchWards({
            type: 'INITIALIZE_WARDS',
            payload: data || [],
          })
          dispatchWards({ type: 'TURN_OFF_LOADING' })
        })
        .catch((err) => {
          console.log(err.message)
          dispatchWards({ type: 'TURN_OFF_LOADING' })
        })
    }

    fetchData()
  }, [dispatchWards])

  return (
    <CCard className="mb-4">
      <CCardBody>
        <h4 className="card-title mb-0">Quản lý phường/xã</h4>
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
            rows={wards.rows}
            loading={wards.loading}
            getRowHeight={() => 'auto'}
            getRowId={(row) => row.id}
            rowSelection={false}
            onRowClick={(params) => {
              navigate(`/admin/wards/${params.row.id}`)
            }}
            paginationModel={{ page: wards.page, pageSize: wards.pageSize }}
            onPaginationModelChange={(params) => {
              dispatchWards({
                type: 'CHANGE_PAGINATION_MODEL',
                payload: {
                  page: params.page,
                  pageSize: params.pageSize,
                },
              })
            }}
            slots={{
              toolbar: CustomGridToolbar,
              noRowsOverlay: CustomNoRowsOverlay,
            }}
            slotProps={{
              toolbar: {
                addNew: () => navigate('/admin/wards/create'),
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

export default WardList
