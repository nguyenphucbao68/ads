import React from 'react'

import { Box, Button, Grid } from '@mui/material'
import { CCard, CCardBody, CForm, CCol, CRow, CFormLabel, CFormInput } from '@coreui/react'
import { useParams } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'

const AdsSpotDetails = () => {
  const { id } = useParams()
  console.log(id)

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
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="optAdsType" className="col-sm-2 col-form-label">
                Hình thức quảng cáo
              </CFormLabel>
              <CCol sm={10}>
                <select className="form-select" id="optAdsType" name="optAdsType">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="checkboxIsAvailable" className="col-sm-2 col-form-label">
                Đã quy hoach
              </CFormLabel>
              <CCol sm={10}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioIsAvailable"
                    id="flexRadioAvailable"
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
                    checked
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
