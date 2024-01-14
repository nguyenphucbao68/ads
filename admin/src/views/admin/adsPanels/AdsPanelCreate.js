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

import * as adsPanelService from 'src/services/adsPanel'
import * as adsPanelTypeService from 'src/services/adsPanelType'
import * as adsSpotService from 'src/services/adsSpot'
import LandingPage from '../adsSpots/LandingPage/LandingPage'
import { getFormattedAddress } from 'src/utils/address'

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

  // Hàm thay đổi
  const onSave = async () => {
    try {
      const width = getValues('width') || 0
      const height = getValues('height') || 0

      const type = getValues('type') || data.adsPanelType[0].id
      const spot_id = currentSpotId || null

      const adsPanelCreateData = {
        ads_type_id: type,
        ads_spot_id: spot_id,
        height: height,
        width: width,
      }

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

  useEffect(() => {
    init()
  }, [])

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

  return (
    <CCard className="mb-4">
      <Toaster position="top-right" reverseOrder={false} />
      <CCardBody>
        <h4 id="ads-panel-type-title" className="card-title mb-0">
          Chi tiết bảng quảng cáo
        </h4>
        <CForm onSubmit={handleSubmit(onSave)}>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              marginTop: '15px',
            }}
          >
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
                  placeholder="Nhập chiều cao (giá trị dương)"
                  {...register('height', {
                    required: 'Vui lòng nhập chiều cao (giá trị dương)',
                    valueAsNumber: true,
                    validate: {
                      positive: (v) => parseInt(v) > 0,
                    },
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
                  placeholder="Nhập chiều rộng (giá trị dương)"
                  {...register('width', {
                    required: 'Vui lòng nhập chiều rộng (giá trị dương)',
                    valueAsNumber: true,
                    validate: {
                      positive: (v) => parseInt(v) > 0,
                    },
                  })}
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
                  spotId={currentSpotId}
                  setCurrentSpotId={setCurrentSpotId}
                  onChangeNewAddress={onChangeNewAddress}
                  currentMarker={currentMarker}
                  setCurrentMarker={setCurrentMarker}
                  isEdit={true}
                />
              </CCol>
            </CRow>
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
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default AdsPanelCreate
