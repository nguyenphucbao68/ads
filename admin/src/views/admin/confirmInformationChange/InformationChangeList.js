import React, { useEffect, useContext } from 'react'

import { Box } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import { CCard, CCardBody } from '@coreui/react'
import { grey } from '@mui/material/colors'
import { GRID_DEFAULT_LOCALE_TEXT } from 'src/components/CustomGridLocale'
import CustomNoRowsOverlay from 'src/components/CustomNoRowsOverlay'
import CustomGridToolbar from 'src/components/CustomGridToolbar'
import { useNavigate } from 'react-router-dom'
import * as ICRService from 'src/services/changeRequest'
import { Toaster, toast } from 'sonner'
import { useLocation } from 'react-router-dom'
import { ICRContext } from 'src/contexts/InformationChangeRequest'

const columns = [
  {
    field: 'address',
    headerName: 'Địa chỉ',
    flex: 2,
    renderCell: (params) => {
      return <span>{params.row.old_information.address}</span>
    },
  },
  {
    field: 'ward',
    headerName: 'Phường',
    flex: 1,
    renderCell: (params) => {
      return <span>{params.row.old_information.ward.name}</span>
    },
  },
  {
    field: 'district',
    headerName: 'Quận',
    flex: 1,
    renderCell: (params) => {
      return <span>{params.row.old_information.district.name}</span>
    },
  },
  {
    field: 'type',
    headerName: 'Loại chỉnh sửa',
    flex: 1,
    renderCell: (cellValues) => {
      return <span>{cellValues.value == 1 ? 'Điểm đặt' : 'Bảng quảng cáo'}</span>
    },
  },
  {
    field: 'edited_at',
    headerName: 'Ngày cập nhật',
    flex: 1,
    renderCell: (cellValues) => {
      return new Date(cellValues.value)
        .toISOString()
        .replace(/T/, ' ') // replace T with a space
        .replace(/\..+/, '') // delete the dot and everything after
    },
  },
  {
    field: 'status',
    headerName: 'Trạng thái',
    flex: 1,
    renderCell: (cellValues) => {
      return (
        <span>
          {cellValues.value == 0
            ? 'Đang chờ duyệt'
            : cellValues.value == 1
            ? 'Hủy bỏ'
            : 'Đã chấp thuận'}
        </span>
      )
    },
  },
]
const InformationChangeList = () => {
  const { ICRs, dispatchICRs } = useContext(ICRContext)

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
    const fetchData = async () => {
      dispatchICRs({ type: 'TURN_ON_LOADING' })
      let data = await ICRService.getAll()
      data = data.map((item) => {
        const oldInf = JSON.parse(item.old_information)
        console.log(oldInf)
        const newInf = JSON.parse(item.new_information)
        return {
          ...item,
          old_information: oldInf,
          new_information: newInf,
        }
      })
      dispatchICRs({
        type: 'INITIALIZE_ICRS',
        payload: data || [],
      })
      dispatchICRs({ type: 'TURN_OFF_LOADING' })
    }

    fetchData()
  }, [dispatchICRs])
  return (
    <div className="information-change-list">
      <CCard className="mb-4">
        <Toaster position="top-right" reverseOrder={false} />
        <CCardBody>
          <h4 className="card-title mb-0">Xét duyệt các yêu cầu chỉnh sửa</h4>
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
              rows={ICRs.rows}
              loading={ICRs.loading}
              getRowHeight={() => 'auto'}
              getRowId={(row) => row.id}
              rowSelection={false}
              onRowClick={(params) => {
                navigate(`/admin/approval/approve_edit_requests/${params.row.id}`)
              }}
              paginationModel={{ page: ICRs.page, pageSize: ICRs.pageSize }}
              onPaginationModelChange={(params) => {
                dispatchICRs({
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
          </Box>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default InformationChangeList
