import React, { useState, useEffect, useContext, useCallback, useRef } from 'react'

import { Box, Button, Grid, styled } from '@mui/material'
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
import * as adsSpotService from 'src/services/adsSpot'
import * as adsTypeService from 'src/services/adsType'
import * as spotTypeService from 'src/services/spotType'
import ConfirmModal from 'src/modals/ConfirmModal'
import MapGL, {
  Popup,
  GeolocateControl,
  Marker,
  Layer,
  Source,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
} from '@goongmaps/goong-map-react'
import './AdsSpotDetails.css'

import ControlPanel from './ControlPanel'
import Pin from './Pin'
import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from './layers'
import { CloudUpload } from '@mui/icons-material'

const API_MAP_KEY = process.env.REACT_APP_ADS_MANAGEMENT_MAP_API_KEY

const fullscreenControlStyle = {
  top: 0,
  right: 0,
  padding: '10px',
}

const navStyle = {
  top: 36,
  right: 0,
  padding: '10px',
}

const geolocateStyle = {
  top: 130,
  right: 0,
  padding: '10px',
}

const scaleControlStyle = {
  bottom: 36,
  right: 0,
  padding: '10px',
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

const AdsSpotDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { adsTypes, dispatchAdsTypes } = useContext(AdsTypeContext)
  const { spotTypes, dispatchSpotTypes } = useContext(SpotTypeContext)
  const [data, setData] = useState({
    showConfirmModal: false,
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
    latitude: 21.02727,
    longitude: 105.85119,
    zoom: 18,
    bearing: 0,
    pitch: 0,
  })
  const mapRef = useRef(null)

  const onClick = (event) => {
    const feature = event.features[0]
    const clusterId = feature.properties.cluster_id

    const mapboxSource = mapRef.current.getMap().getSource('earthquakes')

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return
      }

      setViewport({
        ...viewport,
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
        zoom,
        transitionDuration: 500,
      })
    })
  }
  const [marker, setMarker] = useState({
    latitude: 21.02727,
    longitude: 105.85119,
  })
  const [events, logEvents] = useState({})

  const onMarkerDragStart = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }))
  }, [])

  const onMarkerDrag = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }))
  }, [])

  const onMarkerDragEnd = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }))
    setMarker({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
    })
  }, [])

  const cloudinaryRef = useRef()
  const widgetRef = useRef()
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'dzjaj79nw',
        uploadPreset: 'u4mszkqu',
      },
      (error, result) => {
        if (result.event === 'success') {
          console.log('Upload success with the link: ' + result.info.url)
          setData((pre) => ({
            ...pre,
            fileSelected: [...pre.fileSelected, result.info.url],
          }))
        } else console.error(error)
      },
    )
  }, [])

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      formData.append('address', data.address)
      formData.append('ward_id', 1)
      formData.append('district_id', 1)
      formData.append('spot_type_id', parseInt(data.spot_type_id, 10))
      formData.append('ads_type_id', parseInt(data.ads_type_id, 10))
      formData.append('image', data.images.join(','))
      formData.append('longtitude', viewport.longitude)
      formData.append('latitude', viewport.latitude)
      formData.append('is_available', Boolean(data.is_available))
      formData.append('max_ads_panels', parseInt(data.max_ads_panels, 10))
      // const adsSpot = await adsSpotService.update(id, formData)
      // if (adsSpot) {
      //   toast.success('Cập nhật điểm đặt quảng cáo thành công')
      // } else {
      //   toast.error('Cập nhật điểm đặt quảng cáo thất bại')
      // }
      console.log('formData', formData)
    } catch (err) {
      console.log(err.message)
      toast.error('Cập nhật điểm đặt quảng cáo thất bại')
    }
  }

  const onDelete = async () => {
    try {
      const data = await adsSpotService.deleteById(id)
      if (data.is_deleted) {
        navigate('/admin/ads_spots')
        toast.success('Xóa điểm đặt quảng cáo thành công')
      } else {
        toast.error('Xóa điểm đặt quảng cáo thất bại')
      }
    } catch (err) {
      console.log(err.message)
      toast.error('Xóa điểm đặt quảng cáo thất bại')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const adsTypes = await adsTypeService.getAll()
      dispatchAdsTypes({ type: 'INITIALIZE_ADS_TYPES', payload: adsTypes || [] })

      const spotTypes = await spotTypeService.getAll()
      dispatchSpotTypes({ type: 'INITIALIZE_SPOT_TYPES', payload: spotTypes || [] })

      const adsSpot = await adsSpotService.getById(id)
      setData((pre) => ({
        ...pre,
        adsSpot,
      }))
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
      <ConfirmModal
        visible={data.showConfirmModal}
        title="Xác nhận"
        content="Bạn có chắc chắn muốn thực hiện hành động này không? Hành động này không thể hoàn tác!"
        confirmText="Xác nhận"
        cancelText="Hủy"
        onConfirm={onDelete}
        onCancel={() => setData((pre) => ({ ...pre, showConfirmModal: false }))}
      />
      <CCardBody>
        <h4 id="ads-spots-title" className="card-title">
          Chi tiết điểm đặt quảng cáo
        </h4>
        <hr />
        <CForm onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              height: 'calc(100vh - 350px)',
              width: '100%',
              overflowY: 'auto',
            }}
          >
            <CRow className="mb-3">
              <CFormLabel htmlFor="labelAddress" className="col-sm-12 col-form-label">
                Địa chỉ
              </CFormLabel>
              <CCol sm={12}>
                <MapGL
                  {...viewport}
                  width="100%"
                  height="550px"
                  mapStyle="https://tiles.goong.io/assets/goong_map_web.json"
                  onViewportChange={setViewport}
                  goongApiAccessToken={API_MAP_KEY}
                  // interactiveLayerIds={[clusterLayer.id]}
                  // onClick={onClick}
                  // ref={mapRef}
                >
                  <Marker
                    longitude={marker.longitude}
                    latitude={marker.latitude}
                    offsetTop={-20}
                    offsetLeft={-10}
                    draggable
                    onDragStart={onMarkerDragStart}
                    onDrag={onMarkerDrag}
                    onDragEnd={onMarkerDragEnd}
                  >
                    <Pin size={20} />
                  </Marker>

                  <div className="nav" style={navStyle}>
                    <GeolocateControl style={geolocateStyle} />
                    <FullscreenControl style={fullscreenControlStyle} />
                    <NavigationControl style={navStyle} />
                    <ScaleControl style={scaleControlStyle} />
                  </div>

                  {/* <Source
                    id="earthquakes"
                    type="geojson"
                    data="https://docs.goong.io/assets/earthquakes.geojson"
                    cluster={true}
                    clusterMaxZoom={14}
                    clusterRadius={50}
                  >
                    <Layer {...clusterLayer} />
                    <Layer {...clusterCountLayer} />
                    <Layer {...unclusteredPointLayer} />
                  </Source> */}
                </MapGL>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="imagesPicker" className="col-sm-12 col-form-label">
                Hình ảnh điểm đặt quảng cáo
              </CFormLabel>
              <CCol sm={12}>
                <Gallery>
                  {data.fileSelected.map((file, index) => (
                    <Item key={index} original={file} thumbnail={file} width="1024" height="768">
                      {({ ref, open }) => (
                        <img
                          ref={ref}
                          onClick={open}
                          src={file}
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
              </CCol>
              <CCol sm={2} className="mt-2">
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUpload />}
                  onClick={() => widgetRef.current.open()}
                >
                  Thêm ảnh
                  <VisuallyHiddenInput
                    type="file"
                    disabled
                    {...register('images', { required: 'Vui lòng chọn hình ảnh' })}
                    // onChange={uploadMultiFiles}
                  />
                </Button>
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
                  type="submit"
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
                  onClick={() =>
                    setData((pre) => ({
                      ...pre,
                      showConfirmModal: true,
                    }))
                  }
                  type="button"
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
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default AdsSpotDetails
