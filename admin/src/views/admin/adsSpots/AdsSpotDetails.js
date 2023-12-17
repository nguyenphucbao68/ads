import React, { useState, useEffect, useContext } from 'react'

import { Box, Button, Grid } from '@mui/material'
import { CCard, CCardBody, CForm, CCol, CRow, CFormLabel, CFormInput } from '@coreui/react'
import { useParams } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import { AdsTypeContext } from 'src/contexts/AdsTypeProvider'
import { SpotTypeContext } from 'src/contexts/SpotTypeProvider'
import { useForm } from 'react-hook-form'
import { Gallery, Item } from 'react-photoswipe-gallery'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import ReactMapGL from '@goongmaps/goong-map-react'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
const API_MAP_KEY = process.env.REACT_APP_ADS_MANAGEMENT_MAP_API_KEY

const AdsSpotDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
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
    fileSelected: [],
  })

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm()

  const [viewport, setViewport] = useState({
    longitude: 105.85119,
    latitude: 21.02727,
    zoom: 8,
  })

  const uploadMultiFiles = (e) => {
    const files = Array.from(e.target.files)
    setData((pre) => ({
      ...pre,
      fileSelected: files,
    }))
  }

  const onSubmit = async (data) => {
    console.log(data)
  }

  const onDelete = async () => {
    fetch(`${BACKEND_URL}/vhtt/ads-spots/${id}`, {
      method: 'DELETE',
    })
      .then((rawData) => rawData.json())
      .then((data) => {
        console.log(data)
        if (data.is_deleted) {
          navigate('/admin/ads_spots')
          toast.success('Xóa điểm đặt quảng cáo thành công')
        } else {
          toast.error('Xóa điểm đặt quảng cáo thất bại')
        }
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

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
      <Toaster position="top-right" reverseOrder={false} />
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
          <CForm onSubmit={handleSubmit(onSubmit)}>
            <CRow className="mb-3">
              <CFormLabel htmlFor="labelAddress" className="col-sm-12 col-form-label">
                Địa chỉ
              </CFormLabel>
              <CCol sm={12}>
                <ReactMapGL
                  {...viewport}
                  width="100%"
                  height="550px"
                  mapStyle="https://tiles.goong.io/assets/goong_map_dark.json"
                  onViewportChange={(e) => setViewport({ ...e })}
                  goongApiAccessToken={API_MAP_KEY}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="imagesPicker" className="col-sm-12 col-form-label">
                Hình ảnh điểm đặt quảng cáo
              </CFormLabel>
              <CCol sm={12}>
                <Gallery>
                  {data.fileSelected.map((file, index) => (
                    <Item
                      key={index}
                      original={URL.createObjectURL(file)}
                      thumbnail={URL.createObjectURL(file)}
                      width="1024"
                      height="768"
                    >
                      {({ ref, open }) => (
                        <img
                          ref={ref}
                          onClick={open}
                          src={URL.createObjectURL(file)}
                          alt="..."
                          style={{
                            width: '200px',
                            height: '200px',
                            objectFit: 'cover',
                            margin: '5px',
                          }}
                        />
                      )}
                    </Item>
                  ))}
                </Gallery>
                <CFormInput
                  type="file"
                  id="imagesPicker"
                  className="form-control"
                  onChange={uploadMultiFiles}
                  multiple
                  {...register('images', { required: 'Vui lòng chọn hình ảnh' })}
                  feedback={errors.images?.message}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="optSpotType" className="col-sm-2 col-form-label">
                Loại vị trí
              </CFormLabel>
              <CCol sm={10}>
                <select
                  className="form-select"
                  id="optSpotType"
                  name="optSpotType"
                  {...register('spot_type_id', { required: 'Vui lòng chọn loại vị trí' })}
                >
                  {spotTypes.rows.map((spotType) => (
                    <option
                      key={spotType.id}
                      value={spotType.id}
                      selected={spotType.id === data.adsSpot.spot_type.id}
                    >
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
                <select
                  className="form-select"
                  id="optAdsType"
                  name="optAdsType"
                  {...register('ads_type_id', { required: 'Vui lòng chọn hình thức quảng cáo' })}
                >
                  {adsTypes.rows.map((adsType) => (
                    <option
                      key={adsType.id}
                      value={adsType.id}
                      selected={adsType.id === data.adsSpot.ads_type.id}
                    >
                      {adsType.name}
                    </option>
                  ))}
                </select>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="checkboxIsAvailable" className="col-sm-2 col-form-label">
                Tình trạng quy hoạch
              </CFormLabel>
              <CCol sm={10}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioIsAvailable"
                    id="flexRadioAvailable"
                    {...register('is_available', {
                      required: 'Vui lòng chọn tình trạng quy hoạch',
                    })}
                    value={true}
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
                    {...register('is_available', {
                      required: 'Vui lòng chọn tình trạng quy hoạch',
                    })}
                    value={false}
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
                  id="inputMaxAdsPanels"
                  {...register('max_ads_panels', {
                    valueAsNumber: 'Vui lòng nhập số nguyên dương',
                  })}
                  feedback={errors.max_ads_panels?.message}
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
                disabled={!formState.isDirty}
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
                onClick={onDelete}
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
