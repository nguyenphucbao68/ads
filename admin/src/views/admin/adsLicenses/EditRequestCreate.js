import React, { useContext, useEffect, useState } from 'react'

import { Box, Button, Grid } from '@mui/material'
import { CCard, CCardBody, CForm, CCol, CRow, CFormLabel, CFormInput } from '@coreui/react'
import AddIcon from '@mui/icons-material/Add'
import { AdsPanelContext } from 'src/contexts/AdsPanelProvider'
import * as adsPanelService from 'src/services/adsPanel'
import * as asdSpotService from 'src/services/adsSpot'
import * as changeRequestService from 'src/services/changeRequest'

import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { AdsSpotContext } from 'src/contexts/AdsSpotProvider'
// TODO
const EditRequestCreate = () => {
  const { adsPanels, dispatchAdsPanels } = useContext(AdsPanelContext)
  const { adsSpots, dispatchAdsSpots } = useContext(AdsSpotContext)

  const user = JSON.parse(localStorage.getItem('user'))

  const navigate = useNavigate()

  const id = user?.role === 1 ? user?.district?.id : user?.role === 2 ? user?.ward?.id : null
  const role = user?.role

  useEffect(() => {
    const fetchData = async () => {
      const adsPanelsResponse = await adsPanelService.getAll(id, role)
      dispatchAdsPanels({
        type: 'INITIALIZE_ADS_PANELS',
        payload: adsPanelsResponse || [],
      })
    }

    fetchData()
  }, [dispatchAdsPanels, id, role])

  useEffect(() => {
    const fetchData = async () => {
      const adsSpotsResponse = await asdSpotService.getAll(id, role)
      dispatchAdsSpots({
        type: 'INITIALIZE_ADS_SPOTS',
        payload: adsSpotsResponse || [],
      })
    }

    fetchData()
  }, [dispatchAdsSpots, id, role])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    if (data?.type === '1') {
      const adsSpot = await asdSpotService.getById(data.ads_spot_id)
      const newData = {
        image: data?.image,
        max_ads_panel: data?.max_ads_panel,
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
        navigate('/admin/approval/ads_licenses', {
          state: {
            type: 'success',
            message: `Yêu cầu chỉnh ${
              data?.type === '0' ? 'bảng' : 'điểm đặt'
            } quảng cáo đã gửi thành công`,
          },
        })
      }
    } else if (data?.type === '0') {
      const adsPanel = await adsPanelService.getById(data.ads_panel_id)

      const newData = {
        height: data?.height,
        width: data?.width,
        expire_date: data?.expire_date,
        image: data?.image,
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
        navigate('/admin/approval/ads_licenses', {
          state: {
            type: 'success',
            message: `Yêu cầu chỉnh ${
              data?.type === '0' ? 'bảng' : 'điểm đặt'
            } quảng cáo đã gửi thành công`,
          },
        })
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

  const [currentType, setCurrentType] = useState(0)

  return (
    <CCard className="mb-4">
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <CCardBody>
          <h4 id="ads-panel-type-title" className="card-title mb-0">
            Yêu cầu chỉnh sửa
          </h4>
          <Box
            sx={{
              height: 'calc(100vh - 340px)',
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
                  <CFormLabel htmlFor="adsPanelId" className="col-sm-2 col-form-label">
                    Bảng quảng cáo
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
                  <CFormLabel htmlFor="inputHeight" className="col-sm-2 col-form-label">
                    Chiều cao
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="number"
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
                <CRow className="mb-3">
                  <CFormLabel htmlFor="inputImage" className="col-sm-2 col-form-label">
                    Hình ảnh
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      id="inputImage"
                      {...register('image', { required: 'Vui lòng nhập hình ảnh' })}
                      feedback={errors.image?.message}
                    />
                    <span className="text-danger">{errors.image?.message}</span>
                  </CCol>
                </CRow>
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
                    >
                      {adsSpots?.rows?.map((adsSpot) => (
                        <option key={adsSpot.id} value={adsSpot.id}>
                          {adsSpot?.address}
                        </option>
                      ))}
                    </select>
                  </CCol>
                </CRow>
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
                    >
                      {adsSpots?.rows?.map((adsSpot) => (
                        <option key={adsSpot.id} value={adsSpot.id}>
                          {adsSpot?.address}
                        </option>
                      ))}
                    </select>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="inputImage" className="col-sm-2 col-form-label">
                    Hình ảnh
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      id="inputImage"
                      {...register('image', { required: 'Vui lòng nhập hình ảnh' })}
                      feedback={errors.image?.message}
                    />
                    <span className="text-danger">{errors.image?.message}</span>
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
              </>
            )}

            <CRow className="mb-3">
              <CFormLabel htmlFor="inputAddress" className="col-sm-2 col-form-label">
                Lý do chỉnh sửa
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
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
