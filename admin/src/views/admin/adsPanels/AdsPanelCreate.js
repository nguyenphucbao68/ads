import React, { useEffect, useState, useRef, useCallback } from 'react'
import { format } from 'date-fns'
import { Box, Button, Grid, styled } from '@mui/material'
import {
  CCard,
  CCardBody,
  CForm,
  CCol,
  CRow,
  CFormLabel,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import { Toaster, toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Gallery, Item } from 'react-photoswipe-gallery'
import CancelIcon from '@mui/icons-material/Cancel'
import { CloudUpload } from '@mui/icons-material'
import * as adsPanelService from 'src/services/adsPanel'
import * as adsPanelTypeService from 'src/services/adsPanelType'
import * as adsSpotService from 'src/services/adsSpot'
import LandingPage from '../adsSpots/LandingPage/LandingPage'
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
// TODO
const AdsPanelCreate = () => {
  const [data, setData] = useState({
    adsPanelType: [],
    adsSpotList: [],
    fileSelected: [],
    currentSpot: null,
    new_address: null,
  })

  const cloudinaryRef = useRef()
  const widgetRef = useRef()

  const [isModalDisplay, setIsModalDisplay] = useState(false)
  const navigate = useNavigate()
  const [currentMarker, setCurrentMarker] = useState(null)
  const [currentSpotId, setCurrentSpotId] = useState(1)
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
    getValues,
    setValue,
  } = useForm()

  // Fetch data
  const init = async () => {
    const adsPanelTypeData = await adsPanelTypeService.getAll()
    const adsSpotList = await adsSpotService.getAll()
    setData((prev) => ({
      ...prev,
      adsPanelType: adsPanelTypeData,
      adsSpotList: adsSpotList,
      currentSpot: adsSpotList.find((spot) => spot.id === currentSpotId),
    }))
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    if (!isNaN(date.getTime())) {
      const isoDate = date.toISOString().split('T')[0]
      return isoDate
    } else {
      return 'Invalid Date'
    }
  }

  // Hàm thay đổi
  const onSave = async () => {
    try {
      console.log('currentSpotId', currentSpotId)
      const width = getValues('width') || 0
      const height = getValues('height') || 0
      const expire_date = formatDate(getValues('expire_date') || new Date())

      const type = getValues('type') || data.adsPanelType[0].id
      const spot_id = data.currentSpot.id || 1

      const adsPanelCreateData = {
        ads_type_id: type,
        ads_spot_id: spot_id,
        height: height,
        width: width,
        expire_date: expire_date,
        image: data.fileSelected.length > 0 ? data.fileSelected.join(',') : '',
      }

      console.log('adsPanelCreateData ', adsPanelCreateData)

      await adsPanelService.create(adsPanelCreateData)

      // Hiển thị thông báo thành công rồi chuyển hướng
      toast.success('Cập nhật bảng quảng cáo thành công')
      setTimeout(() => navigate(`/admin/ads_panels`), 1000)
    } catch (err) {
      toast.error('Cập nhật bảng quảng cáo thất bại')
    }
  }

  // Khởi tạo cho drop down loại hình quảng cáo

  const adsTypeOptions = [
    ...data.adsPanelType.map((option) => ({
      label: option.name,
      value: option.id,
    })),
  ]

  // Khởi tạo cho drop down ví trí điểm đặt.)

  const adsSpotOptions = [
    ...data.adsSpotList.map((option) => ({
      label: option.address + ', ' + option.ward.name + ', ' + option.district.name,
      value: option.id,
    })),
  ]

  const parseDate = (value) => {
    const [year, month, day] = value.split('-').map(Number)
    return new Date(year, month - 1, day)
  }

  useEffect(() => {
    init()
    console.log('data init', data)
  }, [])

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'dzjaj79nw',
        uploadPreset: 'u4mszkqu',
      },
      (error, result) => {
        console.log('result.event ', result.event)
        if (result.event === 'success') {
          console.log('Upload success with the link: ' + result.info.url)
          setData((pre) => ({
            ...pre,
            fileSelected: [...pre.fileSelected, result.info.url],
          }))
        }
      },
    )
  }, [])

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

  useEffect(() => {
    setData((pre) => ({
      ...pre,
      currentSpot: data.adsSpotList.find((spot) => spot.id === currentSpotId),
    }))
  }, [currentSpotId])

  return (
    <CCard className="mb-4">
      <Toaster position="top-right" reverseOrder={false} />
      <CCardBody>
        <h4 id="ads-panel-type-title" className="card-title mb-0">
          Chi tiết bảng quảng cáo
        </h4>
        <Box
          sx={{
            height: '100%',
            width: '100%',
            marginTop: '15px',
          }}
        >
          <CForm onSubmit={handleSubmit(onSave)}>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Loại
              </CFormLabel>
              <CCol sm={10}>
                <CFormSelect
                  aria-label="Default select example"
                  options={adsTypeOptions}
                  {...register('type', { required: true })}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="height" className="col-sm-2 col-form-label">
                Chiều cao (m)
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="number"
                  id="height"
                  defaultValue={0}
                  {...register('height', {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="width" className="col-sm-2 col-form-label">
                Chiều rộng (m)
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="number"
                  id="width"
                  defaultValue={0}
                  {...register('width', {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="expire_date" className="col-sm-2 col-form-label">
                Ngày hết hạn
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  id="expire_date"
                  // defaultValue={formatDate(data.adsPanelDetail.expire_date)}
                  {...register('expire_date', {
                    required: true,
                    pattern: {
                      value: /^\d{4}-\d{2}-\d{2}$/,
                      message: 'Please enter a date in YYYY-MM-DD format',
                    },
                    validate: {
                      validDate: (value) => {
                        const date = parseDate(value)
                        return !isNaN(date.getTime()) && value === formatDate(date)
                      },
                    },
                    onChange: (e) => {
                      e.target.value = e.target.value
                        .replace(/[^0-9-]/g, '')
                        .replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
                        .slice(0, 10)
                    },
                  })}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="image" className="col-sm-2 col-form-label">
                Hình ảnh
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
                    {...register('images', { required: true })}
                    // onChange={uploadMultiFiles}
                  />
                </Button>
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
              <CCol sm={12}>
                <LandingPage
                  height="650px"
                  width="100%"
                  spotId={currentSpotId}
                  setCurrentSpotId={setCurrentSpotId}
                  onChangeNewAddress={onChangeNewAddress}
                  currentMarker={currentMarker}
                  setCurrentMarker={setCurrentMarker}
                />
              </CCol>
            </CRow>
          </CForm>
        </Box>
        <Box
          sx={{
            width: '100%',
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
                onClick={() => onSave()}
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                color="success"
                sx={{
                  borderRadius: '8px',
                }}
                disabled={!formState.isDirty}
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
                onClick={() => setIsModalDisplay(true)}
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

export default AdsPanelCreate
