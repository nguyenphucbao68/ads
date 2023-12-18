import React, { useEffect, useContext } from 'react'

import { Box } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import { CCard, CCardBody } from '@coreui/react'
import { grey } from '@mui/material/colors'
import { GRID_DEFAULT_LOCALE_TEXT } from 'src/components/CustomGridLocale'
import CustomNoRowsOverlay from 'src/components/CustomNoRowsOverlay'
import CustomGridToolbar from 'src/components/CustomGridToolbar'
import { useNavigate } from 'react-router-dom'
import { DistrictContext } from 'src/contexts/DistrictProvider'
import * as districtService from 'src/services/district'

const columns = [
  { field: 'id', headerName: 'STT', width: 70 },
  {
    field: 'name',
    headerName: 'Tên quận/huyện',
    flex: 1,
  },
]

const DistrictList = () => {
  const { districts, dispatchDistricts } = useContext(DistrictContext)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      dispatchDistricts({ type: 'TURN_ON_LOADING' })
      const districtsResponse = await districtService.getAll()
      dispatchDistricts({
        type: 'INITIALIZE_DISTRICTS',
        payload: districtsResponse || [],
      })
      dispatchDistricts({ type: 'TURN_OFF_LOADING' })
    }

    fetchData()
  }, [dispatchDistricts])

  return (
    <CCard className="mb-4">
      <CCardBody>
        <h4 id="ads-spots-title" className="card-title mb-0">
          Quản lý quận/huyện
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
            rows={districts.rows}
            loading={districts.loading}
            getRowHeight={() => 'auto'}
            getRowId={(row) => row.id}
            rowSelection={false}
            onRowClick={(params) => {
              navigate(`/admin/districts/${params.row.id}`)
            }}
            paginationModel={{ page: districts.page, pageSize: districts.pageSize }}
            onPaginationModelChange={(params) => {
              dispatchDistricts({
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
                addNew: () => navigate('/admin/districts/create'),
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

export default DistrictList
