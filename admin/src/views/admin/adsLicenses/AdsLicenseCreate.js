import React, { useContext, useEffect, useState, useRef, useCallback } from 'react'

import { Box, Button, Grid } from '@mui/material'
import { CCard, CCardBody, CForm, CCol, CRow, CFormLabel, CFormInput } from '@coreui/react'
import { useParams } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import { AdsPanelContext } from 'src/contexts/AdsPanelProvider'
import * as adsPanelService from 'src/services/adsPanel'
import * as adsLicenseService from 'src/services/adsLicense'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Gallery, Item } from 'react-photoswipe-gallery'
import CancelIcon from '@mui/icons-material/Cancel'
import { CloudUpload } from '@mui/icons-material'

import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { VisuallyHiddenInput } from '../adsPanels/AdsPanelDetail'
import LandingPage from '../adsSpots/LandingPage/LandingPage'
import { getFormattedAddress } from 'src/utils/address'
// TODO
const AdsLicenseCreate = () => {
  const { adsPanels, dispatchAdsPanels } = useContext(AdsPanelContext)
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const [currentMarker, setCurrentMarker] = useState(null)

  const widgetRef = useRef()
  const cloudinaryRef = useRef()

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'dzjaj79nw',
        uploadPreset: 'u4mszkqu',
      },
      (error, result) => {
        if (result.event === 'success') {
          toast.success('Tải ảnh lên thành công')
          setImage(result.info.url)
        }
      },
    )
  }, [])

  const user = JSON.parse(localStorage.getItem('user'))

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const adsPanelsResponse = await adsPanelService.getAll()
      dispatchAdsPanels({
        type: 'INITIALIZE_ADS_PANELS',
        payload: adsPanelsResponse || [],
      })
    }

    fetchData()
  }, [dispatchAdsPanels])

  const onChangeNewAddress = useCallback((address) => {
    setValue(
      'address',
      address.address.length > 0
        ? getFormattedAddress(address.address, address.ward, address.district)
        : null,
      { shouldDirty: true },
    )
  }, [])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setValue('image', image)
  }, [image])

  useEffect(() => {
    setValue('content', content)
  }, [content])

  const onSubmit = async (data) => {
    console.log('===', data)
    const result = await adsLicenseService
      .create({
        ...data,
        user_id: user.id,
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
    if (result.id) {
      navigate('/admin/approval/ads_licenses', {
        state: {
          type: 'success',
          message: 'Yêu cầu cấp phép quảng cáo thành công',
        },
      })
    }
  }

  return (
    <CCard className="mb-4">
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <CCardBody>
          <h4 id="ads-panel-type-title" className="card-title mb-0">
            Tạo cấp phép quảng cáo
          </h4>
          <hr />
          <Box
            sx={{
              height: 'calc(100vh - 310px)',
              width: '100%',
              overflowY: 'auto',
            }}
          >
            <CRow className="mb-3">
              <CFormLabel htmlFor="adsPanelId" className="col-sm-2 col-form-label">
                Bảng quảng cáo & điểm đặt tương ứng
              </CFormLabel>
              <CCol sm={10}>
                <select
                  className="form-select"
                  id="adsPanelId"
                  name="adsPanelId"
                  {...register('ads_panel_id', { required: 'Vui lòng chọn bảng quảng cáo' })}
                >
                  {adsPanels?.rows?.map((adsPanel) => (
                    <option key={adsPanel.id} value={adsPanel.id}>
                      {adsPanel?.ads_panel_type?.name}
                    </option>
                  ))}
                </select>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputContent" className="col-sm-2 col-form-label">
                Nội dung quảng cáo
              </CFormLabel>
              <CCol sm={10}>
                {/* <CFormInput
                  type="text"
                  id="inputContent"
                  {...register('content', { required: 'Vui lòng nhập nội dụng' })}
                  feedback={errors.content?.message}
                />
                <span className="text-danger">{errors.content?.message}</span> */}
                <CKEditor
                  id="content"
                  editor={ClassicEditor}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    editor.ui.view.editable.element.style.minHeight = '200px'
                  }}
                  onChange={(event, editor) => {
                    editor.ui.view.editable.element.style.minHeight = '200px'
                    console.log(event)
                  }}
                  onBlur={(event, editor) => {
                    editor.ui.view.editable.element.style.minHeight = '200px'
                    setContent(editor.getData())
                  }}
                  onFocus={(event, editor) => {
                    editor.ui.view.editable.element.style.minHeight = '200px'
                    console.log('Focus.', editor)
                  }}
                  onInit={(editor) => {
                    editor.ui.view.editable.element.style.minHeight = '200px'
                    editor.editing.view.change((writer) => {
                      writer.setStyle('height', '400px', editor.editing.view.document.getRoot())
                    })
                  }}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputCompanyName" className="col-sm-2 col-form-label">
                Tên công ty
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  id="inputCompanyName"
                  {...register('name', { required: 'Vui lòng nhập tên công ty' })}
                  feedback={errors.name?.message}
                />
                <span className="text-danger">{errors.name?.message}</span>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail" className="col-sm-2 col-form-label">
                Email
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="email"
                  id="inputEmail"
                  {...register('email', { required: 'Vui lòng nhập email' })}
                  feedback={errors.email?.message}
                />
                <span className="text-danger">{errors.email?.message}</span>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPhone" className="col-sm-2 col-form-label">
                Số điện thoại
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  id="inputPhone"
                  {...register('phone', { required: 'Vui lòng nhập số điện thoại' })}
                  feedback={errors.phone?.message}
                />
                <span className="text-danger">{errors.phone?.message}</span>
              </CCol>
            </CRow>
            <CRow className="mb-3 mt-3">
              <CFormLabel htmlFor="inputImage" className="col-sm-2 col-form-label">
                Hình ảnh
              </CFormLabel>
              <CCol sm={10}>
                <Gallery>
                  {image && (
                    <Item original={image} thumbnail={image} width="1024" height="768">
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
                              setImage('')
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
                            src={image}
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
                  )}
                </Gallery>
              </CCol>
              <CCol
                sm={10}
                className="mt-2"
                style={{
                  marginLeft: 'auto',
                }}
              >
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUpload />}
                  onClick={() => widgetRef?.current?.open()}
                >
                  Đổi ảnh
                  <VisuallyHiddenInput
                    type="file"
                    disabled
                    // multiple
                    // onChange={uploadMultiFiles}
                  />
                </Button>
                <div className="text-danger">{!image && 'Vui lòng tải ảnh lên'}</div>
              </CCol>
            </CRow>
            {/* <CRow className="mb-3">
              <CFormLabel htmlFor="inputAddress" className="col-sm-2 col-form-label">
                Địa chỉ
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  id="inputAddress"
                  {...register('address', { required: 'Vui lòng nhập địa chỉ' })}
                  feedback={errors.address?.message}
                />
                <span className="text-danger">{errors.address?.message}</span>
              </CCol>
            </CRow> */}

            <CRow className="mt-2 mb-3">
              <CFormLabel htmlFor="inputAddress" className="col-sm-2 col-form-label">
                Địa chỉ quảng cáo
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  type="text"
                  readOnly
                  plainText
                  placeholder="Chọn địa chỉ đặt quảng cáo trên bản đồ"
                  id="inputAddress"
                  {...register('address', {
                    required: 'Vui lòng chọn địa chỉ đặt quảng cáo trên bản đồ',
                  })}
                  feedback={errors.address?.message}
                />
                {errors.address?.type === 'required' && (
                  <p className="text-danger">Địa chỉ đặt quảng cáo không được để trống</p>
                )}
              </CCol>
              <Button
                className="col-sm-2 mt-1 pt-2 pb-2"
                variant="outlined"
                onClick={() => {
                  setValue('address', null)
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
                  height="600px"
                  width="100%"
                  onChangeNewAddress={onChangeNewAddress}
                  currentMarker={currentMarker}
                  setCurrentMarker={setCurrentMarker}
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CFormLabel htmlFor="inputStartDate" className="col-sm-2 col-form-label">
                Ngày bắt đầu học hợp
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="date"
                  id="inputStartDate"
                  {...register('start_date', { required: 'Vui lòng chọn ngày bắt đầu' })}
                  feedback={errors.start_date?.message}
                />
                <span className="text-danger">{errors.start_date?.message}</span>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEndDate" className="col-sm-2 col-form-label">
                Ngày kết thúc hợp đồng
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="date"
                  id="inputEndDate"
                  {...register('expire_date', { required: 'Vui lòng chọn ngày kết thúc' })}
                  feedback={errors.expire_date?.message}
                />
                <span className="text-danger">{errors.expire_date?.message}</span>
              </CCol>
            </CRow>
          </Box>
          <Box
            sx={{
              width: '100%',
            }}
          >
            <Grid container>
              <Grid item container direction="row" justifyContent="flex-end" alignItems="center">
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<AddIcon />}
                  color="primary"
                  sx={{
                    borderRadius: '8px',
                  }}
                >
                  Tạo
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CCardBody>
      </CForm>
    </CCard>
  )
}

export default AdsLicenseCreate
