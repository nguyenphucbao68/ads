import React, { useEffect, useContext } from 'react'

import { Box, IconButton, Stack } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import { CCard, CCardBody } from '@coreui/react'
import { grey } from '@mui/material/colors'
import { GRID_DEFAULT_LOCALE_TEXT } from 'src/components/CustomGridLocale'
import CustomNoRowsOverlay from 'src/components/CustomNoRowsOverlay'
import CustomGridToolbar from 'src/components/CustomGridToolbar'
import { useNavigate } from 'react-router-dom'
import * as adsLicenseService from 'src/services/adsLicense'
import { AdsLicenseContext } from 'src/contexts/AdsLicenseProvider'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ConfirmModal from 'src/modals/ConfirmModal'
import { Toaster, toast } from 'sonner'

const columns = [
  { field: 'id', headerName: 'STT', width: 70 },
  {
    field: 'ads_panel',
    headerName: 'Bảng quảng cáo & điểm đặt',
    width: 220,
    renderCell: (params) => {
      return (
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontWeight: 'bold',
            }}
          >
            {params.value.ads_panel_type?.name}
          </div>
          <div>{params.value.ads_spot?.address}</div>
        </div>
      )
    },
  },
  {
    field: 'name',
    headerName: 'Tên công ty',
    width: 200,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
  },
  {
    field: 'phone',
    headerName: 'Số điện thoại',
    width: 120,
  },
  {
    field: 'address',
    headerName: 'Địa chỉ',
    width: 200,
  },

  {
    field: 'status',
    headerName: 'Trạng thái',
    width: 150,
    renderCell: (params) => {
      return (
        <Box
          sx={{
            borderRadius: '8px',
            backgroundColor:
              params.value === 0
                ? 'warning.main'
                : params.value === 1
                ? 'success.main'
                : 'error.main',
            color: 'white',
            p: '7px',
            textAlign: 'center',
          }}
        >
          {params.value === 0 ? 'Chờ duyệt' : params.value === 1 ? 'Đã duyệt' : 'Không phê duyệt'}
        </Box>
      )
    },
  },
  {
    field: 'actions',
    headerName: 'Phê duyệt',
    flex: 1,
    renderCell: (params) => {
      return (
        <Stack
          direction="row"
          spacing={0}
          sx={{
            height: '100%',
            width: '100%',
          }}
          onClick={(event) => event.stopPropagation()}
        >
          <IconButton
            aria-label="approve"
            color="success"
            size="large"
            disabled={params.value.status !== 0}
            onClick={params.value.approveFunc}
          >
            <CheckCircleIcon />
          </IconButton>
          <IconButton
            aria-label="decline"
            color="warning"
            size="large"
            disabled={params.value.status !== 0}
            onClick={params.value.declineFunc}
          >
            <HighlightOffIcon />
          </IconButton>
        </Stack>
      )
    },
  },
]

const AdsLicenseList = () => {
  const { adsLicences, dispatchAdsLicenses } = useContext(AdsLicenseContext)

  const [data, setData] = React.useState({
    showConfirmModal: false,
    title: '',
    content: '',
    onConfirm: () => {},
  })

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      dispatchAdsLicenses({ type: 'TURN_ON_LOADING' })
      try {
        const currentUser = JSON.parse(localStorage.getItem('user'))
        const query = `?user_id=${currentUser.id}`
        const data = await adsLicenseService.getAll(query)
        for (let i = 0; i < data.length; i++) {
          data[i].actions = {
            status: data[i].status,
            approveFunc: () => {
              setData((pre) => ({
                ...pre,
                showConfirmModal: true,
                title: 'Xác nhận phê duyệt',
                content: 'Bạn có chắc chắn muốn phê duyệt cấp phép quảng cáo này?',
                onConfirm: async () => {
                  const result = await adsLicenseService.update(data[i].id, { status: 1 })
                  if (result.id) {
                    setData((pre) => ({ ...pre, showConfirmModal: false }))
                    toast.success('Phê duyệt cấp phép quảng cáo thành công')
                  } else {
                    toast.error('Phê duyệt cấp phép quảng cáo thất bại')
                  }
                },
              }))
            },
            declineFunc: () => {
              setData((pre) => ({
                ...pre,
                showConfirmModal: true,
                title: 'Xác nhận từ chối',
                content: 'Bạn có chắc chắn muốn từ chối cấp phép quảng cáo này?',
                onConfirm: async () => {
                  const result = await adsLicenseService.update(data[i].id, { status: 2 })
                  if (result.id) {
                    setData((pre) => ({ ...pre, showConfirmModal: false }))
                    toast.success('Từ chối cấp phép quảng cáo thành công')
                  } else {
                    toast.error('Từ chối cấp phép quảng cáo thất bại')
                  }
                },
              }))
            },
          }
        }
        dispatchAdsLicenses({
          type: 'INITIALIZE_ADS_LICENSES',
          payload: data || [],
        })
        dispatchAdsLicenses({ type: 'TURN_OFF_LOADING' })
      } catch (err) {
        console.log(err.message)
        dispatchAdsLicenses({ type: 'TURN_OFF_LOADING' })
      }
    }

    fetchData()
  }, [dispatchAdsLicenses, data.showConfirmModal])

  // const handleFilterByWardOrDistrict = (type, districtId, wardId) => {

  return (
    <CCard className="mb-4">
      <ConfirmModal
        visible={data.showConfirmModal}
        title={data.title}
        content={data.content}
        confirmText="Xác nhận"
        cancelText="Hủy"
        onConfirm={data.onConfirm}
        onCancel={() => setData((pre) => ({ ...pre, showConfirmModal: false }))}
      />
      <Toaster position="top-right" reverseOrder={false} />
      <CCardBody>
        <h4 id="ads-spots-title" className="card-title mb-0">
          Xét duyệt cấp phép quảng cáo
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
            rows={adsLicences.rows}
            loading={adsLicences.loading}
            getRowHeight={() => 'auto'}
            getRowId={(row) => row.id}
            rowSelection={false}
            onRowClick={(params) => {
              navigate(`/admin/approval/ads_licenses/${params.row.id}`)
            }}
            paginationModel={{ page: adsLicences.page, pageSize: adsLicences.pageSize }}
            onPaginationModelChange={(params) => {
              dispatchAdsLicenses({
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
                filterByWardOrDistrict: () => {},
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

export default AdsLicenseList
