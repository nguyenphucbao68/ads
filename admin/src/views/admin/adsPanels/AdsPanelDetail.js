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
import { useParams } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import { Toaster, toast } from 'sonner'
import ConfirmModal from 'src/modals/ConfirmModal'
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
export const VisuallyHiddenInput = styled('input')({
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
const AdsPanelDetail = () => {
  const { id } = useParams()

  const [data, setData] = useState({
    adsPanelType: [],
    adsPanelDetail: {
      id: null,
      ads_type_id: null,
      height: null,
      width: null,
      expire_date: null,
      image: null,
      ads_spot_id: null,
      is_deleted: null,
      created_at: null,
      updated_at: null,
    },
    adsSpotList: [],
    fileSelected: [],
    currentSpot: null,
    new_address: null,
  })
  const [isModalDisplay, setIsModalDisplay] = useState(false)
  const navigate = useNavigate()
  const [currentSpotId, setCurrentSpotId] = useState(null)

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
    const adsPanelData = await adsPanelService.getById(id)
    const adsPanelTypeData = await adsPanelTypeService.getAll()
    const adsSpotList = await adsSpotService.getAll()
    const currentSpot = adsSpotList.find((spot) => spot.id === adsPanelData.ads_spot_id)
    setData((prev) => ({
      ...prev,
      adsPanelDetail: adsPanelData,
      adsPanelType: adsPanelTypeData,
      adsSpotList: adsSpotList,
      currentSpot: currentSpot,
      fileSelected: adsPanelData.image.split(',').filter((image) => image.length > 0),
    }))

    setValue(
      'old_address',
      getFormattedAddress(currentSpot.address, currentSpot.ward.name, currentSpot.district.name),
    )

    setCurrentMarker({
      latitude: currentSpot.latitude,
      longitude: currentSpot.longtitude,
    })
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

  const [currentMarker, setCurrentMarker] = useState(null)

  useEffect(() => {
    setData((pre) => ({
      ...pre,
      currentSpot: data.adsSpotList.find((spot) => spot.id === currentSpotId),
    }))
  }, [currentSpotId])

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

  // Hàm thay đổi
  const onSave = async () => {
    try {
      const width = getValues('width') || data.adsPanelDetail.width
      const height = getValues('height') || data.adsPanelDetail.height
      const expire_date = formatDate(getValues('expire_date') || data.adsPanelDetail.expire_date)
      const type = getValues('type') || data.adsPanelDetail.ads_type_id
      const spot_id = data.currentSpot.id || data.adsPanelDetail.ads_spot_id

      const adsPanelUpdateData = {
        ads_type_id: type,
        ads_spot_id: spot_id,
        height: height,
        width: width,
        expire_date: expire_date,
        image: data.fileSelected.length > 0 ? data.fileSelected[0] : data.adsPanelDetail.image,
      }

      await adsPanelService.update(id, adsPanelUpdateData)

      // Hiển thị thông báo thành công rồi chuyển hướng
      toast.success('Cập nhật bảng quảng cáo thành công')
      setTimeout(() => navigate(`/admin/ads_panels`), 1000)
    } catch (err) {
      toast.error('Cập nhật bảng quảng cáo thất bại')
    }
  }

  // Hàm xóa
  const onDelete = async () => {
    try {
      await adsPanelService.deleteById(id)
      navigate(`/admin/ads_panels`)
    } catch (err) {
      toast.error('Cập nhật bảng quảng cáo thất bại')
    }
  }

  // Khởi tạo cho drop down loại hình quảng cáo
  const selectedAdsType = data.adsPanelType.find(
    (option) => option.id === data.adsPanelDetail.ads_type_id,
  )

  const adsTypeOptions = [
    {
      label: selectedAdsType ? selectedAdsType.name : '',
      value: selectedAdsType ? selectedAdsType.id : '',
    },
    ...data.adsPanelType
      .filter((option) => option.id !== data.adsPanelType.ads_type_id)
      .map((option) => ({
        label: option.name,
        value: option.id,
      })),
  ]

  // Khởi tạo cho drop down ví trí điểm đặt.
  const selectedAdsSpot = data.adsSpotList.find(
    (option) => option.id === data.adsPanelDetail.ads_spot_id,
  )

  const adsSpotOptions = [
    {
      label: selectedAdsSpot
        ? selectedAdsSpot.address +
          ', ' +
          selectedAdsSpot.ward.name +
          ', ' +
          selectedAdsSpot.district.name
        : '',
      value: selectedAdsSpot ? selectedAdsSpot.id : '',
    },
    ...data.adsSpotList
      .filter((option) => option.id !== data.adsPanelType.ads_spot_id)
      .map((option) => ({
        label: option.address + ', ' + option.ward.name + ', ' + option.district.name,
        value: option.id,
      })),
  ]

  const cloudinaryRef = useRef()
  const widgetRef = useRef()

  useEffect(() => {
    init()
  }, [id])

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

  return (
    <CCard className="mb-4">
      <Toaster position="top-right" reverseOrder={false} />
      <ConfirmModal
        visible={isModalDisplay}
        title="Xác nhận"
        content="Bạn có chắc chắn muốn xoá loại bảng quảng cáo này?"
        confirmText="Xác nhận"
        cancelText="Hủy"
        onConfirm={onDelete}
        onCancel={() => setIsModalDisplay(false)}
      />
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
                  defaultValue={data.adsPanelDetail.height}
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
                  defaultValue={data.adsPanelDetail.width}
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
                {data.adsPanelDetail.expire_date ? (
                  <CFormInput
                    type="text"
                    id="expire_date"
                    defaultValue={formatDate(data.adsPanelDetail.expire_date)}
                    disabled
                    {...register('expire_date', { required: true })}
                  />
                ) : null}
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
              <CCol sm={12}>
                <LandingPage
                  height="650px"
                  width="100%"
                  onChangeNewAddress={onChangeNewAddress}
                  currentMarker={currentMarker}
                  setCurrentMarker={setCurrentMarker}
                />
              </CCol>
            </CRow>
            {/* <CRow className="mb-3">
              <CFormLabel htmlFor="spot_id" className="col-sm-2 col-form-label">
                Điểm đặt tại đây
              </CFormLabel>
              <CCol sm={10}>
                <CFormSelect
                  aria-label="Default select example"
                  options={adsSpotOptions}
                  {...register('spot_id', { required: true })}
                />
              </CCol>
            </CRow> */}
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

export default AdsPanelDetail
