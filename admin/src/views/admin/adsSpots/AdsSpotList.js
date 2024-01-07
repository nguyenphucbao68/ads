import React, { useEffect, useContext } from 'react'

import { Box, Checkbox } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import { CCard, CCardBody } from '@coreui/react'
import { grey } from '@mui/material/colors'
import { GRID_DEFAULT_LOCALE_TEXT } from 'src/components/CustomGridLocale'
import CustomNoRowsOverlay from 'src/components/CustomNoRowsOverlay'
import CustomGridToolbar from 'src/components/CustomGridToolbar'
import { useLocation, useNavigate } from 'react-router-dom'
import { AdsSpotContext } from 'src/contexts/AdsSpotProvider'
import * as adsSpotService from 'src/services/adsSpot'
import { Toaster, toast } from 'sonner'
import WardFilterComponent from '../adsLicenses/WardFilterComponent'
import DistrictFilterComponent from '../adsLicenses/DistrictFilterComponent'

const columns = [
  { field: 'id', headerName: 'STT', width: 70 },
  {
    field: 'address',
    headerName: 'Địa điểm',
    width: 200,
  },
  {
    field: 'ward',
    headerName: 'Phường',
    width: 150,
    renderCell: (params) => {
      return <span>{params.row.ward.name}</span>
    },
    filterOperators: [
      {
        label: 'Bằng',
        value: 'equal',
        getApplyFilterFn: (filterItem) => {
          if (
            !filterItem.field ||
            !filterItem.value ||
            !filterItem.operator ||
            // eslint-disable-next-line eqeqeq
            filterItem.value == '0'
          ) {
            return null
          }
          return (params) => {
            return Number(params.row.ward.id) === Number(filterItem.value)
          }
        },
        InputComponent: WardFilterComponent,
        InputComponentProps: {
          type: 'number',
        },
      },
    ],
  },
  {
    field: 'district',
    headerName: 'Quận',
    width: 100,
    renderCell: (params) => {
      return <span>{params.row.district.name}</span>
    },
    filterOperators: [
      {
        label: 'Bằng',
        value: 'equal',
        getApplyFilterFn: (filterItem) => {
          if (
            !filterItem.field ||
            !filterItem.value ||
            !filterItem.operator ||
            // eslint-disable-next-line eqeqeq
            filterItem.value == '0'
          ) {
            return null
          }
          return (params) => {
            return Number(params.row.district.id) === Number(filterItem.value)
          }
        },
        InputComponent: DistrictFilterComponent,
        InputComponentProps: {
          type: 'number',
        },
      },
    ],
  },
  {
    field: 'spot_type_name',
    headerName: 'Loại vị trí',
    width: 400,
    renderCell: (cellValues) => {
      const spotType = cellValues.row['spot_type']
      return <span>{spotType.name}</span>
    },
  },
  {
    field: 'ads_type_name',
    headerName: 'Hình thức quảng cáo',
    width: 200,
    renderCell: (cellValues) => {
      const adsType = cellValues.row['ads_type']
      return <span>{adsType.name}</span>
    },
  },
  {
    field: 'is_available',
    headerName: 'Đã quy hoạch',
    flex: 1,
    type: 'boolean',
    sortable: false,
    renderCell: (cellValues) => {
      return (
        <Checkbox
          checked={cellValues.row.is_available}
          color={cellValues.row.is_available ? 'success' : 'error'}
        />
      )
    },
  },
]

const AdsSpotList = () => {
  const { adsSpots, dispatchAdsSpots } = useContext(AdsSpotContext)

  const user = JSON.parse(localStorage.getItem('user'))

  const id = user?.role === 1 ? user?.district?.id : user?.role === 2 ? user?.ward?.id : null
  const role = user?.role

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
      dispatchAdsSpots({ type: 'TURN_ON_LOADING' })
      try {
        const data = await adsSpotService.getAll(id, role)
        dispatchAdsSpots({
          type: 'INITIALIZE_ADS_SPOTS',
          payload: data || [],
        })
        dispatchAdsSpots({ type: 'TURN_OFF_LOADING' })
      } catch (err) {
        console.log(err.message)
        dispatchAdsSpots({ type: 'TURN_OFF_LOADING' })
      }
    }

    fetchData()
  }, [dispatchAdsSpots, id, role])

  return (
    <CCard className="mb-4">
      <Toaster position="top-right" reverseOrder={false} />
      <CCardBody>
        <h4 id="ads-spots-title" className="card-title mb-0">
          Quản lý điểm đặt quảng cáo
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
            rows={adsSpots.rows}
            loading={adsSpots.loading}
            getRowHeight={() => 'auto'}
            getRowId={(row) => row.id}
            rowSelection={false}
            onRowClick={(params) => {
              navigate(`/admin/ads_spots/${params.row.id}`)
            }}
            paginationModel={{ page: adsSpots.page, pageSize: adsSpots.pageSize }}
            onPaginationModelChange={(params) => {
              dispatchAdsSpots({
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
                addNew: () => navigate('/admin/ads_spots/create'),
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

export default AdsSpotList
