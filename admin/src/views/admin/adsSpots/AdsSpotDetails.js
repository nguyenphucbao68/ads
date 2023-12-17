import React, { useState, useEffect, useContext } from 'react'

import { Box, Button, Grid } from '@mui/material'
import { CCard, CCardBody, CForm, CCol, CRow, CFormLabel, CFormInput } from '@coreui/react'
import { useParams } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import { AdsTypeContext } from 'src/contexts/AdsTypeProvider'
import { SpotTypeContext } from 'src/contexts/SpotTypeProvider'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const AdsSpotDetails = () => {
  const { id } = useParams()
  const { adsTypes, dispatchAdsTypes } = useContext(AdsTypeContext)
  const { spotTypes, dispatchSpotTypes } = useContext(SpotTypeContext)
  const [data, setData] = useState({
    adsSpot: {
      id,
      address: '',
      spot_type: {
        id: 1,
        name: '',
      },
      ads_type: {
        id: 1,
        name: '',
      },
      is_available: true,
      max_ads_panels: 1,
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      fetch(`${BACKEND_URL}/vhtt/ads-types`)
        .then((rawData) => rawData.json())
        .then((data) => {
          dispatchAdsTypes({ type: 'INITIALIZE_ADS_TYPES', payload: data || [] })
        })

      fetch(`${BACKEND_URL}/vhtt/spot-types`)
        .then((rawData) => rawData.json())
        .then((data) => {
          dispatchSpotTypes({ type: 'INITIALIZE_SPOT_TYPES', payload: data || [] })
        })

      fetch(`${BACKEND_URL}/vhtt/ads-spots/${id}`)
        .then((rawData) => rawData.json())
        .then((data) => {
          setData((pre) => ({
            ...pre,
            adsSpot: data,
          }))
        })
        .catch((err) => {
          console.log(err.message)
        })
    }

    fetchData()
  }, [id, dispatchAdsTypes, dispatchSpotTypes])

  return (
    <CCard
      className="mb-4"
      sx={{
        backgroundColor: '#fff',
      }}
    >
      <CCardBody>
        <h4 id="ads-spots-title" className="card-title">
          Chi tiết điểm đặt quảng cáo
        </h4>
        <hr />
        <Box
          sx={{
            height: 'calc(100vh - 350px)',
            width: '100%',
            overflowY: 'auto',
          }}
        >
          <CForm>
            <CRow className="mb-3">
              <CFormLabel htmlFor="labelAddress" className="col-sm-12 col-form-label">
                Địa chỉ
              </CFormLabel>
              <CCol sm={12}>
                <Box
                  sx={{
                    height: '500px',
                    backgroundColor: '#ccc',
                    borderRadius: '8px',
                  }}
                ></Box>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="optSpotType" className="col-sm-2 col-form-label">
                Loại vị trí
              </CFormLabel>
              <CCol sm={10}>
                <select className="form-select" id="optSpotType" name="optSpotType">
                  {spotTypes.rows.map((spotType) => (
                    <option key={spotType.id} value={spotType.id}>
                      {spotType.name}
                    </option>
                  ))}
                </select>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="optAdsType" className="col-sm-2 col-form-label">
                Hình thức quảng cáo
              </CFormLabel>
              <CCol sm={10}>
                <select className="form-select" id="optAdsType" name="optAdsType">
                  {adsTypes.rows.map((adsType) => (
                    <option key={adsType.id} value={adsType.id}>
                      {adsType.name}
                    </option>
                  ))}
                </select>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="checkboxIsAvailable" className="col-sm-2 col-form-label">
                Tình trạng quy hoach
              </CFormLabel>
              <CCol sm={10}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioIsAvailable"
                    id="flexRadioAvailable"
                    defaultChecked={data.adsSpot.is_available}
                  />
                  <label className="form-check-label" htmlFor="flexRadioAvailable">
                    Đã quy hoạch
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioIsAvailable"
                    id="flexRadioNotAvailable"
                    defaultChecked={!data.adsSpot.is_available}
                  />
                  <label className="form-check-label" htmlFor="flexRadioNotAvailable">
                    Chưa quy hoạch
                  </label>
                </div>
              </CCol>
            </CRow>
            <CRow className="mt-2 mb-3">
              <CFormLabel htmlFor="inputMaxAdsPanels" className="col-sm-2 col-form-label">
                Số lượng bảng quảng cáo tối đa
              </CFormLabel>
              <CCol sm={10} className="pt-2">
                <CFormInput
                  type="number"
                  step="1"
                  min="1"
                  max="5"
                  id="inputMaxAdsPanels"
                  defaultValue={1}
                />
              </CCol>
            </CRow>
          </CForm>
        </Box>
        <Box
          sx={{
            width: '100%',
            marginTop: '20px',
          }}
        >
          <Grid container>
            <Grid
              item
              container
              direction="row"
              xs={6}
              justifyContent="flex-start"
              alignItems="center"
            >
              <Button
                onClick={() => console.log('Lưu')}
                variant="contained"
                startIcon={<SaveIcon />}
                color="primary"
                disabled
                sx={{
                  borderRadius: '8px',
                }}
              >
                Lưu
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Button
                onClick={() => console.log('Xóa')}
                variant="text"
                startIcon={<DeleteIcon />}
                color="error"
                sx={{
                  borderRadius: '8px',
                }}
              >
                Xóa
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CCardBody>
    </CCard>
  )
}

export default AdsSpotDetails
