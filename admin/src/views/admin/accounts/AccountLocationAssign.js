import React, { useEffect, useContext, useState } from 'react'

import { Box } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import { CCard, CCardBody } from '@coreui/react'
import { grey } from '@mui/material/colors'
import { GRID_DEFAULT_LOCALE_TEXT } from 'src/components/CustomGridLocale'
import CustomNoRowsOverlay from 'src/components/CustomNoRowsOverlay'
import CustomGridToolbar from 'src/components/CustomGridToolbar'
import { useNavigate } from 'react-router-dom'
import { UserContext } from 'src/contexts/UserProvider'
import * as userService from 'src/services/user'
import { Toaster, toast } from 'sonner'
import { useLocation } from 'react-router-dom'
import AccountAssignModal from './AccountAssignModal'

const columns = [
  { field: 'id', headerName: 'STT', width: 70 },
  {
    field: 'name',
    headerName: 'Họ và tên',
    width: 200,
  },
  {
    field: 'dob',
    headerName: 'Ngày sinh',
    width: 150,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'phone',
    headerName: 'Số điện thoại',
    width: 150,
  },
  {
    field: 'role',
    headerName: 'Vai trò',
    width: 140,
    renderCell: (params) => {
      if (params.value === 2) {
        return <span>Cán bộ Phường</span>
      }
      if (params.value === 1) {
        return <span>Cán bộ Quận</span>
      }
      return <span>Cán bộ Sở VH-TT</span>
    },
  },
  {
    field: 'location',
    headerName: 'Khu vực quản lý',
    width: 200,
  },
  {
    field: 'action',
    headerName: 'Thao tác',
    width: 150,
    renderCell: (params) => (
      <div>
        <button
          className="btn btn-primary"
          onClick={() => {
            params.value()
          }}
        >
          Phân công
        </button>
      </div>
    ),
  },
]

const AccountLocationAssign = () => {
  const { users, dispatchUsers } = useContext(UserContext)
  const [selectedUser, setSelectedUser] = useState(null)

  const showSuccesToast = (message) => {
    toast.success(message)
  }

  const location = useLocation()

  useEffect(() => {
    if (location.state?.type === 'success') {
      showSuccesToast(location.state.message)
    }
  }, [location])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      dispatchUsers({ type: 'TURN_ON_LOADING' })
      const usersResponse = await userService.getAll()
      for (let i = 0; i < usersResponse.length; i += 1) {
        usersResponse[i].action = () => {
          setSelectedUser(usersResponse[i])
        }
      }
      dispatchUsers({
        type: 'INITIALIZE_USERS',
        payload: usersResponse || [],
      })
      dispatchUsers({ type: 'TURN_OFF_LOADING' })
    }

    fetchData()
  }, [dispatchUsers, selectedUser])

  return (
    <CCard className="mb-4">
      <Toaster position="top-right" reverseOrder={false} />
      <CCardBody>
        <h4 id="ads-spots-title" className="card-title mb-0">
          Phân công khu vực quản lý
        </h4>
        {selectedUser !== null && (
          <AccountAssignModal
            user={selectedUser}
            onClose={() => {
              setSelectedUser(null)
            }}
          />
        )}
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
            rows={users.rows}
            loading={users.loading}
            getRowHeight={() => 'auto'}
            getRowId={(row) => row.id}
            rowSelection={false}
            // onRowClick={(params) => {
            //   navigate(`/admin/accounts/${params.row.id}`)
            // }}
            paginationModel={{ page: users.page, pageSize: users.pageSize }}
            onPaginationModelChange={(params) => {
              dispatchUsers({
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
                addNew: () => navigate('/admin/create_account'),
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

export default AccountLocationAssign
