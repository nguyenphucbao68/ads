import { grey } from '@mui/material/colors'
import React, { useEffect, useContext, useState } from 'react'
import { GRID_DEFAULT_LOCALE_TEXT } from 'src/components/CustomGridLocale'
import CustomNoRowsOverlay from 'src/components/CustomNoRowsOverlay'
import CustomGridToolbar from 'src/components/CustomGridToolbar'
import * as reportService from 'src/services/report'

import { DataGrid, gridClasses } from '@mui/x-data-grid'
import { ReportContext } from 'src/contexts/ReportProvider'

import { useNavigate } from 'react-router-dom'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

const columns = [
  { field: 'created_at', headerName: 'Thời điểm gửi', flex: 15 },
  { field: 'name', headerName: 'Họ tên', flex: 15 },
  { field: 'email', headerName: 'Email', flex: 15 },
  { field: 'phone', headerName: 'Điện thoại', flex: 15 },
  { field: 'address', headerName: 'Địa chỉ báo cáo', flex: 25 },
  { field: 'ward_name', headerName: 'Phường', flex: 25 },
  { field: 'district_name', headerName: 'Quận', flex: 25 },
  { field: 'report_type_name', headerName: 'Loại hình báo cáo', flex: 13 },
  {
    field: 'status',
    headerName: 'Trạng thái',
    renderCell: (cellValues) => {
      const status = cellValues.value
      return status == 0 ? <span>Chưa xử lý</span> : <span>Đã xử lý</span>
    },
  },

  {
    field: 'view_status',
    headerName: '',
    flex: 2,
    renderCell: (cellValues) => {
      const dot = cellValues.value
      return dot == 0 ? <FiberManualRecordIcon color="info" fontSize="small" /> : <span />
    },
  },
]

const ReportList = () => {
  const { reports, dispatchReports } = useContext(ReportContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      dispatchReports({ type: 'TURN_ON_LOADING' })
      const data = await reportService.getAll()
      data.forEach((element) => {
        element.created_at = new Date(element.created_at)
          .toISOString()
          .replace(/T/, ' ') // replace T with a space
          .replace(/\..+/, '') // delete the dot and everything after
        element.image = element.image.split(',')
      })
      dispatchReports({
        type: 'INITIALIZE_REPORTS',
        payload: data || [],
      })
      dispatchReports({ type: 'TURN_OFF_LOADING' })
    }

    fetchData()
  }, [dispatchReports])
  return (
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
      rows={reports.rows}
      loading={reports.loading}
      getRowHeight={() => 'auto'}
      getRowId={(row) => row.id}
      rowSelection={false}
      onRowClick={(params) => {
        navigate(`/admin/report/${params.row.id}`)
      }}
      paginationModel={{ page: reports.page, pageSize: reports.pageSize }}
      onPaginationModelChange={(params) => {
        dispatchReports({
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
          addNew: null,
        },
      }}
      localeText={GRID_DEFAULT_LOCALE_TEXT}
      getRowSpacing={(params) => ({
        top: params.isFirstVisible ? 0 : 5,
        bottom: params.isLastVisible ? 0 : 5,
      })}
    />
  )
}

export default ReportList
