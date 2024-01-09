import React, { useState, useEffect, useContext, useRef, useCallback } from 'react'

import { Box, Button, Grid, styled } from '@mui/material'
import { CCard, CCardBody, CForm, CCol, CRow, CFormLabel, CFormInput } from '@coreui/react'
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

import { CloudUpload } from '@mui/icons-material'
import CancelIcon from '@mui/icons-material/Cancel'
import LandingPage from './LandingPage/LandingPage'
import { getFormattedAddress } from 'src/utils/address'

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

const AdsSpotCreate = () => {
  const navigate = useNavigate()
  const { adsTypes, dispatchAdsTypes } = useContext(AdsTypeContext)
  const { spotTypes, dispatchSpotTypes } = useContext(SpotTypeContext)
  const [currentMarker, setCurrentMarker] = useState(null)
  const [data, setData] = useState({
    showConfirmModal: false,
    adsSpot: {
      address: '',
      image: '',
      ward: {
        id: 1,
        name: '',
      },
      district: {
        id: 1,
        name: '',
      },
      spot_type: {
        id: 1,
        name: '',
      },
      ads_type: {
        id: 1,
        name: '',
      },
      is_available: true,
      max_ads_panel: 1,
    },
    new_address: {
      address: '',
      ward: '',
      district: '',
      long: 0,
      lat: 0,
    },
    fileSelected: [],
  })

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    values: {
      new_address:
        data.new_address.address.length > 0
          ? getFormattedAddress(
              data.new_address.address,
              data.new_address.ward,
              data.new_address.district,
            )
          : null,
      spot_type_id: data.adsSpot.spot_type.id,
      ads_type_id: data.adsSpot.ads_type.id,
      is_available: data.adsSpot.is_available,
      max_ads_panel: data.adsSpot.max_ads_panel,
      images: data.fileSelected,
    },
  })

  const onChangeNewAddress = useCallback((address) => {
    setData((pre) => ({
      ...pre,
      new_address: address,
    }))
    setValue(
      'new_address',
      address.address.length > 0
        ? getFormattedAddress(address.address, address.ward, address.district)
        : null,
      { shouldDirty: true, shouldValidate: true },
    )
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
          setValue('images', [...getValues('images'), result.info.url], { shouldDirty: true })
        } else console.error(error)
      },
    )
  }, [])

  const onSubmit = async (dat) => {
    try {
      const body = {
        address: data.new_address.address,
        ward_name: data.new_address.ward,
        district_name: data.new_address.district,
        longtitude: Number(data.new_address.long),
        latitude: Number(data.new_address.lat),
        spot_type_id: parseInt(dat.spot_type_id, 10),
        ads_type_id: parseInt(dat.ads_type_id, 10),
        image: dat.images.join(','),
        is_available: Boolean(dat.is_available),
        max_ads_panel: parseInt(dat.max_ads_panel, 10),
      }

      const adsSpot = await adsSpotService.create(body)
      if (adsSpot.id) {
        navigate('/admin/ads_spots', {
          state: {
            message: 'Thêm điểm đặt quảng cáo thành công',
            color: 'success',
          },
        })
      } else {
        toast.error('Cập nhật điểm đặt quảng cáo thất bại')
      }
    } catch (err) {
      console.error(err.message)
      toast.error('Cập nhật điểm đặt quảng cáo thất bại')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const adsTypes = await adsTypeService.getAll()
      dispatchAdsTypes({ type: 'INITIALIZE_ADS_TYPES', payload: adsTypes || [] })

      const spotTypes = await spotTypeService.getAll()
      dispatchSpotTypes({ type: 'INITIALIZE_SPOT_TYPES', payload: spotTypes || [] })
    }

    fetchData()
  }, [])

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
        <CForm onSubmit={handleSubmit(onSubmit)} id="AdsSpotCreate">
          <Box
            sx={{
              height: 'calc(100vh - 350px)',
              width: '100%',
              overflowY: 'auto',
            }}
          >
            <CRow className="mt-2 mb-3">
              <CFormLabel htmlFor="inputAddress" className="col-sm-2 col-form-label">
                Địa chỉ đặt quảng cáo
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  readOnly
                  plainText
                  placeholder="Chọn địa chỉ đặt quảng cáo trên bản đồ"
                  id="inputAddress"
                  {...register('new_address', {
                    required: 'Vui lòng chọn địa chỉ đặt quảng cáo trên bản đồ',
                  })}
                  feedback={errors.new_address?.message}
                />
                {errors.new_address?.type === 'required' && (
                  <p className="text-danger">Địa chỉ đặt quảng cáo không được để trống</p>
                )}
              </CCol>
            </CRow>

            <CRow className="mb-3">
              {/* <CFormLabel htmlFor="labelAddress" className="col-sm-12 col-form-label"></CFormLabel> */}
              <CCol sm={12}>
                <LandingPage
                  height="550px"
                  width="100%"
                  onChangeNewAddress={onChangeNewAddress}
                  currentMarker={currentMarker}
                  setCurrentMarker={setCurrentMarker}
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
                    <Item key={index} original={file} thumbnail={file} width="1024" height="768">
                      {({ ref, open }) => (
                        <div
                          style={{
                            position: 'relative',
                            display: 'inline-block',
                            cursor: 'pointer',
                            width: '200px',
                            marginRight: '10px',
                            marginTop: '5px',
                            marginBottom: '5px',
                          }}
                        >
                          <CancelIcon
                            onClick={() => {
                              setData((pre) => ({
                                ...pre,
                                fileSelected: pre.fileSelected.filter((_, i) => i !== index),
                              }))
                            }}
                            style={{
                              position: 'absolute',
                              top: '-10px',
                              right: '-15px',
                              cursor: 'pointer',
                              zIndex: 999,
                            }}
                            color="error"
                          />
                          <img
                            ref={ref}
                            onClick={open}
                            src={file}
                            alt="..."
                            style={{
                              width: '200px',
                              height: '200px',
                              objectFit: 'cover',
                            }}
                          />
                        </div>
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
                    // multiple
                    {...register('images', { validate: (value) => value.length > 0 })}
                    // onChange={uploadMultiFiles}
                  />
                </Button>
              </CCol>
              {errors.images?.type === 'validate' && (
                <p className="text-danger">Hình ảnh điểm đặt quảng cáo không được để trống</p>
              )}
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
                  {...register('max_ads_panel', {
                    valueAsNumber: 'Vui lòng nhập số nguyên dương',
                  })}
                  feedback={errors.max_ads_panel?.message}
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
                  onSubmit={onSubmit}
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  color="primary"
                  disabled={!formState.isDirty}
                  sx={{
                    borderRadius: '8px',
                  }}
                >
                  Thêm
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default AdsSpotCreate
