import React, { useEffect, useContext } from 'react'

import { Box, Checkbox } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import { CCard, CCardBody } from '@coreui/react'
import { grey } from '@mui/material/colors'
import { GRID_DEFAULT_LOCALE_TEXT } from 'src/components/CustomGridLocale'
import CustomNoRowsOverlay from 'src/components/CustomNoRowsOverlay'
import CustomGridToolbar from 'src/components/CustomGridToolbar'
import { useNavigate } from 'react-router-dom'
import { AdsSpotContext } from 'src/contexts/AdsSpotProvider'
import * as adsSpotService from 'src/services/adsSpot'

const columns = [
  { field: 'id', headerName: 'STT', width: 70 },
  {
    field: 'name',
    headerName: 'Tên công ty',
    width: 150,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
  },
  {
    field: 'phone',
    headerName: 'Số điện thoại',
    width: 100,
  },
  {
    field: 'address',
    headerName: 'Địa chỉ',
    width: 150,
  },
  {
    field: 'ads_panel',
    headerName: 'Bảng quảng cáo',
    // flex: 1,
    width: 150,
  },
  {
    field: 'status',
    headerName: 'Trạng thái',
    // flex: 1,
    width: 150,
  },
]

const AdsLicenseList = () => {
  const { adsSpots, dispatchAdsSpots } = useContext(AdsSpotContext)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      dispatchAdsSpots({ type: 'TURN_ON_LOADING' })
      try {
        const data = await adsSpotService.getAll()
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
  }, [dispatchAdsSpots])

  return (
    <CCard className="mb-4">
      <CCardBody>
        <h4 id="ads-spots-title" className="card-title mb-0">
          Danh sách cấp phép quảng cáo
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
            rows={[]}
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

export default AdsLicenseList
