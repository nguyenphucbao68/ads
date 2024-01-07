import React, { useState, useEffect, useContext, useRef, useCallback } from 'react'

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

const AdsSpotDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { adsTypes, dispatchAdsTypes } = useContext(AdsTypeContext)
  const { spotTypes, dispatchSpotTypes } = useContext(SpotTypeContext)
  const [currentMarker, setCurrentMarker] = useState(null)
  const [data, setData] = useState({
    showConfirmModal: false,
    adsSpot: {
      id,
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
    reset,
    setValue,
  } = useForm({
    values: {
      old_address: getFormattedAddress(
        data.adsSpot.address,
        data.adsSpot.ward.name,
        data.adsSpot.district.name,
      ),
      new_address: null,
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
      { shouldDirty: true },
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
          setData((pre) => ({
            ...pre,
            fileSelected: [...pre.fileSelected, result.info.url],
          }))
        } else console.error(error)
      },
    )
  }, [])

  const onSubmit = async () => {
    try {
      const body = {
        address: data.new_address.address,
        ward_name: data.new_address.ward,
        district_name: data.new_address.district,
        longtitude: Number(data.new_address.long),
        latitude: Number(data.new_address.lat),
        spot_type_id: parseInt(getValues('spot_type_id'), 10),
        ads_type_id: parseInt(getValues('ads_type_id'), 10),
        image: getValues('images').join(','),
        is_available: Boolean(getValues('is_available')),
        max_ads_panel: parseInt(getValues('max_ads_panel'), 10),
      }

      const adsSpot = await adsSpotService.update(id, body)
      if (adsSpot) {
        setData((pre) => ({
          ...pre,
          adsSpot,
        }))
        reset()
        toast.success('Cập nhật điểm đặt quảng cáo thành công')
      } else {
        toast.error('Cập nhật điểm đặt quảng cáo thất bại')
      }
    } catch (err) {
      console.error(err.message)
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
        fileSelected: adsSpot.image.split(','),
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
            <CRow className="mt-2 mb-3">
              <CFormLabel htmlFor="inputOldAddress" className="col-sm-2 col-form-label">
                Địa chỉ hiện tại
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  readOnly
                  plainText
                  id="inputOldAddress"
                  {...register('old_address', {})}
                  feedback={errors.old_address?.message}
                />
              </CCol>
            </CRow>
            <CRow className="mt-2 mb-3">
              <CFormLabel htmlFor="inputNewAddress" className="col-sm-2 col-form-label">
                Địa chỉ mới
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  type="text"
                  readOnly
                  plainText
                  placeholder="Chọn địa chỉ mới trên bản đồ"
                  id="inputNewAddress"
                  {...register('new_address', {})}
                  feedback={errors.new_address?.message}
                />
              </CCol>
              {/* Add reset button */}
              <Button
                className="col-sm-2 mt-1 pt-2 pb-2"
                variant="outlined"
                onClick={() => {
                  setValue('new_address', null)
                  setCurrentMarker(null)
                }}
              >
                Đặt lại
              </Button>
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
                  onClick={() => onSubmit()}
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
