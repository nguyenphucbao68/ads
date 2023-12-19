import React, { useEffect, useContext, useState } from 'react'

import { Box } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import { CCard, CCardBody } from '@coreui/react'
import { grey } from '@mui/material/colors'
import { GRID_DEFAULT_LOCALE_TEXT } from 'src/components/CustomGridLocale'
import CustomNoRowsOverlay from 'src/components/CustomNoRowsOverlay'
import CustomGridToolbar from 'src/components/CustomGridToolbar'
import { useNavigate } from 'react-router-dom'
import { WardContext } from 'src/contexts/WardProvider'
import * as wardService from 'src/services/ward'
import { Toaster, toast } from 'sonner'
import { useLocation } from 'react-router-dom'

const columns = [
  { field: 'send_time', headerName: 'Thời điểm gửi', flex: 15 },
  { field: 'name', headerName: 'Họ tên', flex: 15 },
  { field: 'email', headerName: 'Email', flex: 15 },
  { field: 'phone', headerName: 'Điện thoại', flex: 15 },
  { field: 'address', headerName: 'Địa chỉ báo cáo', flex: 25 },
  { field: 'report_type', headerName: 'Loại hình báo cáo', flex: 15 },
  { field: 'id', headerName: 'id', hide: true },
]

const ViewReports = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [reports, setReports] = useState([])

  const navigate = useNavigate()
  const location = useLocation()

  const showSuccesToast = (message) => {
    toast.success(message)
  }

  useEffect(() => {
    if (location.state?.type === 'success') {
      showSuccesToast(location.state.message)
    }
  }, [location])

  useEffect(() => {
    const fetchData = async () => {}
    // fetchData()
  }, [])
  return (
    <div className="view-reports">
      <CCard className="mb-4">
        <Toaster position="top-right" reverseOrder={false} />
        <CCardBody>
          <h4 className="card-title mb-0">Các báo cáo được người dân gửi về</h4>
          <Box
            sx={{
              height: 'calc(100vh - 300px)',
              width: '100%',
              marginTop: '15px',
            }}
          >
            <DataGrid
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    // Hide columns status and traderName, the other columns will remain visible
                    id: false,
                  },
                },
              }}
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
              rows={reports}
              loading={isLoading}
              getRowHeight={() => 'auto'}
              getRowId={(row) => row.id}
              rowSelection={false}
              //   onRowClick={(params) => {
              //     navigate(`/admin/wards/${params.row.id}`)
              //   }}
              //   paginationModel={{ page: wards.page, pageSize: wards.pageSize }}
              //   onPaginationModelChange={(params) => {
              //     dispatchWards({
              //       type: 'CHANGE_PAGINATION_MODEL',
              //       payload: {
              //         page: params.page,
              //         pageSize: params.pageSize,
              //       },
              //     })
              //   }}
              //   slots={{
              //     toolbar: CustomGridToolbar,
              //     noRowsOverlay: CustomNoRowsOverlay,
              //   }}
              //   slotProps={{
              //     toolbar: {
              //       addNew: () => navigate('/admin/wards/create'),
              //     },
              //   }}
              //   localeText={GRID_DEFAULT_LOCALE_TEXT}
              //   getRowSpacing={(params) => ({
              //     top: params.isFirstVisible ? 0 : 5,
              //     bottom: params.isLastVisible ? 0 : 5,
              //   })}
            />
          </Box>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default ViewReports
