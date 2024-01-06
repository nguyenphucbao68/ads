import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'

import { Box, Button, Grid, styled } from '@mui/material'
import {
  CCard,
  CCardBody,
  CForm,
  CCol,
  CRow,
  CFormLabel,
  CFormInput,
  CFormTextarea,
} from '@coreui/react'
import AddIcon from '@mui/icons-material/Add'
import * as adsPanelService from 'src/services/adsPanel'
import * as asdSpotService from 'src/services/adsSpot'
import * as spotTypeService from 'src/services/spotType'
import * as asdTypeService from 'src/services/adsType'
import * as changeRequestService from 'src/services/changeRequest'
import * as asdPanelTypeService from 'src/services/adsPanelType'

import { useForm } from 'react-hook-form'
import { toast, Toaster } from 'sonner'
import { AdsSpotContext } from 'src/contexts/AdsSpotProvider'
import { Gallery, Item } from 'react-photoswipe-gallery'
import CancelIcon from '@mui/icons-material/Cancel'
import { CloudUpload } from '@mui/icons-material'
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

const EditRequestCreate = () => {
  const { adsSpots, dispatchAdsSpots } = useContext(AdsSpotContext)
  const [adsTypes, setAdsTypes] = useState([])
  const [spotTypes, setSpotTypes] = useState([])
  const [asdPanelTypes, setAsdPanelTypes] = useState([])
  const widgetRef = useRef()
  const cloudinaryRef = useRef()
  const [image, setImage] = useState('')
  const [currentMarker, setCurrentMarker] = useState(null)

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

  useEffect(() => {
    const fetchAdsTypes = async () => {
      const adsTypesResponse = await asdTypeService.getAll()
      return adsTypesResponse
    }

    const fetchSpotTypes = async () => {
      const spotTypesResponse = await spotTypeService.getAll()
      return spotTypesResponse
    }

    const fetchAdsPanelTypes = async () => {
      const adsPanelTypesResponse = await asdPanelTypeService.getAll()
      return adsPanelTypesResponse
    }

    fetchAdsPanelTypes().then((res) => {
      setAsdPanelTypes(res)
    })

    fetchAdsTypes().then((res) => {
      setAdsTypes(res)
    })

    fetchSpotTypes().then((res) => {
      setSpotTypes(res)
    })
  }, [])

  const [adsPanelsData, setAdsPanelsData] = useState([])

  const user = JSON.parse(localStorage.getItem('user'))

  const id = user?.role === 1 ? user?.district?.id : user?.role === 2 ? user?.ward?.id : null
  const role = user?.role

  const [currentPanel, setCurrentPanel] = useState(0)
  const [currentType, setCurrentType] = useState('1')
  const [currentSpot, setCurrentSpot] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const adsSpotsResponse = await asdSpotService.getAll(id, role)
      dispatchAdsSpots({
        type: 'INITIALIZE_ADS_SPOTS',
        payload: adsSpotsResponse || [],
      })
      setCurrentSpot(adsSpotsResponse?.[0])
    }

    fetchData()
  }, [dispatchAdsSpots, id, role])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  const onSubmit = async (data) => {
    if (!image) {
      toast.error('Vui lòng tải ảnh lên')
      return
    }
    if (data?.type === '1') {
      const adsSpot = await asdSpotService.getById(data.ads_spot_id)
      const newData = {
        image: image,
        max_ads_panel: data?.max_ads_panel,
        spot_type_id: data?.spot_type_id,
        ads_type_id: data?.ads_type_id,
      }
      const dataCreate = {
        old_information: JSON.stringify(adsSpot),
        new_information: JSON.stringify(newData),
        user_id: user.id,
        type: parseInt(data.type),
        status: 0,
        reason: data?.reason,
        edited_at: data?.edited_at,
      }

      const result = await changeRequestService
        .create({
          ...dataCreate,
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
      if (result.id) {
        toast.success(
          `Yêu cầu chỉnh sửa ${
            data?.type === '0' ? 'bảng' : 'điểm đặt'
          } quảng cáo đã gửi thành công`,
        )

        setImage('')
        // navigate('/admin/approval/ads_licenses', {
        //   state: {
        //     type: 'success',
        //     message: `Yêu cầu chỉnh ${
        //       data?.type === '0' ? 'bảng' : 'điểm đặt'
        //     } quảng cáo đã gửi thành công`,
        //   },
        // })
      }
    } else if (data?.type === '0') {
      const adsPanel = await adsPanelService.getById(data.ads_panel_id)

      const newData = {
        height: data?.height,
        width: data?.width,
        expire_date: data?.expire_date,
        image: image,
        ads_panel_id: data?.ads_panel_id,
        ads_spot_id: data?.ads_spot_id,
        ads_type_id: data?.ads_type_id,
      }
      const dataCreate = {
        old_information: JSON.stringify(adsPanel),
        new_information: JSON.stringify(newData),
        user_id: user.id,
        type: parseInt(data.type),
        status: 0,
        reason: data?.reason,
        edited_at: data?.edited_at,
      }
      const result = await changeRequestService
        .create({
          ...dataCreate,
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
      if (result.id) {
        setImage('')
        toast.success(
          `Yêu cầu chỉnh sửa ${
            data?.type === '0' ? 'bảng' : 'điểm đặt'
          } quảng cáo đã gửi thành công`,
        )
        // navigate('/admin/approval/ads_licenses', {
        //   state: {
        //     type: 'success',
        //     message: `Yêu cầu chỉnh ${
        //       data?.type === '0' ? 'bảng' : 'điểm đặt'
        //     } quảng cáo đã gửi thành công`,
        //   },
        // })
      }
    }
  }

  const types = [
    {
      value: 0,
      label: 'Bảng quảng cáo',
    },
    {
      value: 1,
      label: 'Điểm đặt',
    },
  ]

  useEffect(() => {
    if (!currentSpot) return
    const fetchData = async () => {
      const adsPanelsResponse = await asdSpotService.getAllAdsPanelByAdsSpotId(
        parseInt(currentSpot.id),
      )
      setAdsPanelsData(adsPanelsResponse || [])
      setCurrentPanel(adsPanelsResponse?.[0])
    }

    setCurrentMarker({
      latitude: currentSpot?.latitude,
      longitude: currentSpot?.longtitude,
    })

    fetchData()
    if (currentType === '1') {
      setValue('max_ads_panel', currentSpot?.max_ads_panel)
      setValue('spot_type_id', currentSpot?.spot_type_id)
      setValue('ads_type_id', currentSpot?.ads_type_id)
      setValue(
        'address',
        getFormattedAddress(currentSpot.address, currentSpot.ward.name, currentSpot.district.name),
      )

      setImage(currentSpot?.image ?? '')
    }
  }, [currentSpot, setValue, currentType])

  useEffect(() => {
    if (!currentPanel) return
    if (currentType === '0') {
      setValue('height', currentPanel?.height.toFixed(2))
      setValue('width', currentPanel?.width.toFixed(2))
      const date = new Date(currentPanel?.expire_date)
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()

      const expireDate = `${year}-${month < 10 ? `0${month}` : `${month}`}-${
        day < 10 ? `0${day}` : `${day}`
      }`

      setValue('expire_date', expireDate)
      setImage(currentPanel?.image ?? '')
    }
  }, [currentPanel, setValue, currentType])

  return (
    <CCard className="mb-4">
      <Toaster position="top-right" reverseOrder={false} />
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <CCardBody>
          <h4 id="ads-panel-type-title" className="card-title mb-0">
            Yêu cầu chỉnh sửa
          </h4>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              marginTop: '15px',
            }}
          >
            <CRow className="mb-3">
              <CFormLabel htmlFor="type" className="col-sm-2 col-form-label">
                Loại yêu cầu
              </CFormLabel>
              <CCol sm={10}>
                <select
                  className="form-select"
                  id="type"
                  name="type"
                  defaultValue={'1'}
                  {...register('type', { required: 'Vui lòng chọn loại' })}
                  onChange={(event) => {
                    setCurrentType(event.target.value)
                  }}
                >
                  {types?.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type?.label}
                    </option>
                  ))}
                </select>
              </CCol>
            </CRow>
            {currentType === '0' ? (
              <>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="adsSpotId" className="col-sm-2 col-form-label">
                    Điểm đặt quảng cáo
                  </CFormLabel>
                  <CCol sm={10}>
                    <select
                      className="form-select"
                      id="adsSpotId"
                      name="adsSpotId"
                      {...register('ads_spot_id', {
                        required: 'Vui lòng chọn điểm đặt quảng cáo',
                      })}
                      onChange={(event) => {
                        setCurrentSpot(
                          adsSpots?.rows?.find((x) => x.id === parseInt(event.target.value)),
                        )
                      }}
                    >
                      {adsSpots?.rows?.map((adsSpot) => (
                        <option key={adsSpot.id} value={adsSpot.id}>
                          {adsSpot?.address}
                        </option>
                      ))}
                    </select>
                  </CCol>
                </CRow>
                <CRow className="mt-2 mb-3">
                  <CFormLabel htmlFor="inputAddress" className="col-sm-2 col-form-label">
                    Địa chỉ hiện tại
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      readOnly
                      plainText
                      id="inputAddress"
                      {...register('address', {})}
                      feedback={errors.address?.message}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="labelAddress"
                    className="col-sm-12 col-form-label"
                  ></CFormLabel>
                  <CCol sm={12}>
                    <LandingPage
                      height="550px"
                      width="100%"
                      onChangeNewAddress={() => {}}
                      currentMarker={currentMarker}
                      setCurrentMarker={setCurrentMarker}
                      spotId={currentSpot?.id}
                    />
                  </CCol>
                </CRow>
                {adsPanelsData?.length > 0 && (
                  <>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="adsPanelId" className="col-sm-2 col-form-label">
                        Bảng quảng cáo
                      </CFormLabel>
                      <CCol sm={10}>
                        <select
                          className="form-select"
                          id="adsPanelId"
                          name="adsPanelId"
                          {...register('ads_panel_id', {
                            required: 'Vui lòng chọn bảng quảng cáo',
                          })}
                          onChange={(event) => {
                            setCurrentPanel(
                              adsPanelsData?.find((x) => x.id === parseInt(event.target.value)),
                            )
                          }}
                        >
                          {adsPanelsData?.map((adsPanel, index) => (
                            <option key={adsPanel.id} value={adsPanel.id}>
                              {/* {adsPanel?.ads_panel_type?.name} */}
                              {`Bảng quảng cáo ${index + 1} - ${adsPanel?.ads_panel_type?.name}`}
                            </option>
                          ))}
                        </select>
                      </CCol>
                    </CRow>
                    {currentPanel.id && (
                      <CRow className="mb-3">
                        <CFormLabel htmlFor="asdPanelTypeId" className="col-sm-2 col-form-label">
                          Loại bảng quảng cáo
                        </CFormLabel>
                        <CCol sm={10}>
                          <select
                            className="form-select"
                            id="asdPanelTypeId"
                            name="asdPanelTypeId"
                            {...register('ads_type_id', {
                              required: 'Vui lòng chọn loại bảng quảng cáo',
                            })}
                          >
                            {asdPanelTypes?.map((adsPanelType, index) => (
                              <option key={adsPanelType.id} value={adsPanelType.id}>
                                {adsPanelType?.name}
                              </option>
                            ))}
                          </select>
                        </CCol>
                      </CRow>
                    )}
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="inputHeight" className="col-sm-2 col-form-label">
                        Chiều cao
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput
                          type="number"
                          step={0.01}
                          id="inputHeight"
                          {...register('height', { required: 'Vui lòng nhập chiều cao' })}
                          feedback={errors.height?.message}
                        />
                        <span className="text-danger">{errors.height?.message}</span>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="inputWidth" className="col-sm-2 col-form-label">
                        Chiều rộng
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput
                          type="number"
                          step={0.01}
                          id="inputWidth"
                          {...register('width', { required: 'Vui lòng nhập chiều rộng' })}
                          feedback={errors.width?.message}
                        />
                        <span className="text-danger">{errors.width?.message}</span>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CFormLabel htmlFor="inputExpireDate" className="col-sm-2 col-form-label">
                        Ngày hết hạn
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput
                          type="date"
                          id="inputExpireDate"
                          {...register('expire_date', { required: 'Vui lòng chọn ngày hết hạn' })}
                          feedback={errors.expire_date?.message}
                        />
                        <span className="text-danger">{errors.expire_date?.message}</span>
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
                          onClick={() => widgetRef.current.open()}
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
                  </>
                )}
              </>
            ) : (
              <>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="adsSpotId" className="col-sm-2 col-form-label">
                    Điểm đặt quảng cáo
                  </CFormLabel>
                  <CCol sm={10}>
                    <select
                      className="form-select"
                      id="adsSpotId"
                      name="adsSpotId"
                      {...register('ads_spot_id', {
                        required: 'Vui lòng chọn điểm đặt quảng cáo',
                      })}
                      onChange={(event) => {
                        setCurrentSpot(
                          adsSpots?.rows?.find((x) => x.id === parseInt(event.target.value)),
                        )
                      }}
                    >
                      {adsSpots?.rows?.map((adsSpot) => (
                        <option key={adsSpot.id} value={adsSpot.id}>
                          {adsSpot?.address}
                        </option>
                      ))}
                    </select>
                  </CCol>
                </CRow>
                <CRow className="mt-2 mb-3">
                  <CFormLabel htmlFor="inputAddress" className="col-sm-2 col-form-label">
                    Địa chỉ hiện tại
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      readOnly
                      plainText
                      id="inputAddress"
                      {...register('address', {})}
                      feedback={errors.address?.message}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel
                    htmlFor="labelAddress"
                    className="col-sm-12 col-form-label"
                  ></CFormLabel>
                  <CCol sm={12}>
                    <LandingPage
                      height="550px"
                      width="100%"
                      onChangeNewAddress={() => {}}
                      currentMarker={currentMarker}
                      setCurrentMarker={setCurrentMarker}
                      spotId={currentSpot?.id}
                    />
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
                      onClick={() => widgetRef.current.open()}
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
                <CRow className="mb-3">
                  <CFormLabel htmlFor="inputMaxAdsPanel" className="col-sm-2 col-form-label">
                    Số bảng quảng cáo tối đa
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="number"
                      id="inputMaxAdsPanel"
                      {...register('max_ads_panel', {
                        required: 'Vui lòng nhập số lượng bảng quảng cáo tối đa',
                      })}
                      feedback={errors.max_ads_panel?.message}
                    />
                  </CCol>
                  <span className="text-danger">{errors.max_ads_panel?.message}</span>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="spotTypeId" className="col-sm-2 col-form-label">
                    Loại điểm đặt
                  </CFormLabel>
                  <CCol sm={10}>
                    <select
                      className="form-select"
                      id="spotTypeId"
                      name="spotTypeId"
                      {...register('spot_type_id', {
                        required: 'Vui lòng chọn loại điểm đặt quảng cáo',
                      })}
                    >
                      {spotTypes?.map((spotType) => (
                        <option key={spotType.id} value={spotType.id}>
                          {spotType?.name}
                        </option>
                      ))}
                    </select>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="adsTypeId" className="col-sm-2 col-form-label">
                    Loại quảng cáo
                  </CFormLabel>
                  <CCol sm={10}>
                    <select
                      className="form-select"
                      id="adsTypeId"
                      name="adsTypeId"
                      {...register('ads_type_id', {
                        required: 'Vui lòng chọn loại quảng cáo',
                      })}
                    >
                      {adsTypes?.map((adsType) => (
                        <option key={adsType.id} value={adsType.id}>
                          {adsType?.name}
                        </option>
                      ))}
                    </select>
                  </CCol>
                </CRow>
              </>
            )}

            <CRow className="mb-3">
              <CFormLabel htmlFor="inputAddress" className="col-sm-2 col-form-label">
                Lý do chỉnh sửa
              </CFormLabel>
              <CCol sm={10}>
                <CFormTextarea
                  rows={5}
                  id="inputReason"
                  {...register('reason', { required: 'Vui lòng nhập lí do' })}
                  feedback={errors.reason?.message}
                />
                <span className="text-danger">{errors.address?.message}</span>
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CFormLabel htmlFor="inputStartDate" className="col-sm-2 col-form-label">
                Ngày chỉnh sửa
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="date"
                  id="inputEditDate"
                  {...register('edited_at', { required: 'Vui lòng chọn ngày chỉnh sửa' })}
                  feedback={errors.edited_at?.message}
                />
                <span className="text-danger">{errors.edited_at?.message}</span>
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

export default EditRequestCreate
