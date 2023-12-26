import React, { useContext, useEffect } from 'react'

import { Box, Button, Grid } from '@mui/material'
import { CCard, CCardBody, CForm, CCol, CRow, CFormLabel, CFormInput } from '@coreui/react'
import AddIcon from '@mui/icons-material/Add'
import { AdsPanelContext } from 'src/contexts/AdsPanelProvider'
import * as adsPanelService from 'src/services/adsPanel'
import * as adsLicenseService from 'src/services/adsLicense'
import * as changeRequestService from 'src/services/changeRequest'

import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
// TODO
const EditRequestCreate = () => {
  const { adsPanels, dispatchAdsPanels } = useContext(AdsPanelContext)

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    console.log('data', data)
    const adsPanel = await adsPanelService.getById(data.ads_panel_id)
    console.log('adsPanel', adsPanel)
    const dataCreate = {
      old_information: JSON.stringify(adsPanel),
      new_information: JSON.stringify(data),
      user_id: user.id,
      type: 0,
      status: 0,
    }

    const result = await changeRequestService
      .create({
        ...dataCreate,
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
    // if (result.id) {
    //   navigate('/admin/approval/ads_licenses', {
    //     state: {
    //       type: 'success',
    //       message: 'Yêu cầu cấp phép quảng cáo thành công',
    //     },
    //   })
    // }
  }

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
                <CFormInput
                  type="text"
                  id="inputContent"
                  {...register('content', { required: 'Vui lòng nhập nội dụng' })}
                  feedback={errors.content?.message}
                />
                <span className="text-danger">{errors.content?.message}</span>
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
            <CRow className="mb-3">
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
            </CRow>

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
                  {...register('edit_date', { required: 'Vui lòng chọn ngày chỉnh sửa' })}
                  feedback={errors.edit_date?.message}
                />
                <span className="text-danger">{errors.edit_date?.message}</span>
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

export default EditRequestCreate
