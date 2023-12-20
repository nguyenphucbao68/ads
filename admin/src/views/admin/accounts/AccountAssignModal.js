/* eslint-disable eqeqeq */
import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Box, Button } from '@mui/material'
import {
  CForm,
  CCol,
  CRow,
  CFormLabel,
  CFormInput,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CButton,
  CModalFooter,
} from '@coreui/react'
import SaveIcon from '@mui/icons-material/Save'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { WardContext } from 'src/contexts/WardProvider'
import { DistrictContext } from 'src/contexts/DistrictProvider'
import * as wardService from 'src/services/ward'
import * as districtService from 'src/services/district'
import * as userService from 'src/services/user'

const AccountAssignModal = ({ user, onClose }) => {
  const { wards, dispatchWards } = useContext(WardContext)
  const { districts, dispatchDistricts } = useContext(DistrictContext)

  const {
    register,
    handleSubmit,
    watch,
    formState,
    formState: { errors },
  } = useForm({
    values: {
      email: user.email,
      name: user.name,
      dob: new Date(user.dob).toISOString().slice(0, 10),
      phone: user.phone,
      role: user.role,
      ward_id: user.user_ward.length > 0 ? user.user_ward[0].ward_id : 1,
      district_id: user.user_district.length > 0 ? user.user_district[0].district_id : 1,
    },
  })
  const role = watch('role')

  const onSubmit = async (data) => {
    const formatData = {
      role: parseInt(data.role, 10),
    }
    if (role == '2') {
      formatData.ward_id = parseInt(data.ward_id, 10)
    } else if (role == '1') {
      formatData.district_id = parseInt(data.district_id, 10)
    }
    const result = await userService.assignUserRoleAndLocation(parseInt(user.id, 10), formatData)
    if (result && result.id) {
      toast.success('Phân công khu vực quản lý thành công')
      onClose()
    } else {
      toast.error('Phân công khu vực quản lý thất bại')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const districtsResponse = await districtService.getAll()
      dispatchDistricts({
        type: 'INITIALIZE_DISTRICTS',
        payload: districtsResponse || [],
      })

      const wardsResponse = await wardService.getAll()
      dispatchWards({
        type: 'INITIALIZE_WARDS',
        payload: wardsResponse || [],
      })
    }

    fetchData()
  }, [dispatchDistricts, dispatchWards])

  return (
    <CModal
      size="lg"
      visible={user !== null}
      onClose={onClose}
      aria-labelledby="LiveDemoExampleLabel"
    >
      <CForm onSubmit={handleSubmit(onSubmit)}>
        <CModalHeader onClose={onClose}>
          <CModalTitle id="LiveDemoExampleLabel">Phân công khu vực quản lý</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <Box
            sx={{
              height: 'calc(450px)',
              width: '100%',
              overflowY: 'auto',
            }}
          >
            <CRow className="mt-2 mb-3">
              <CFormLabel htmlFor="inputEmail" className="col-sm-2 col-form-label">
                Email
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  id="inputEmail"
                  placeholder="Email"
                  readOnly
                  plainText
                  autoComplete="email"
                  {...register('email', {})}
                  feedback={errors.email?.message}
                />
              </CCol>
            </CRow>

            <CRow className="mt-2 mb-3">
              <CFormLabel htmlFor="inputName" className="col-sm-2 col-form-label">
                Họ và tên
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  id="inputName"
                  placeholder="Họ và tên"
                  readOnly
                  plainText
                  autoComplete="name"
                  {...register('name', {})}
                  feedback={errors.name?.message}
                />
                {errors.name?.type === 'required' && (
                  <p className="text-danger">Họ và tên là bắt buộc</p>
                )}
              </CCol>
            </CRow>

            <CRow className="mt-2 mb-3">
              <CFormLabel htmlFor="inputDOB" className="col-sm-2 col-form-label">
                Ngày sinh
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="date"
                  id="inputDOB"
                  placeholder="Ngày sinh"
                  readOnly
                  plainText
                  autoComplete="dob"
                  {...register('dob', {})}
                  feedback={errors.dob?.message}
                />
                {errors.dob?.type === 'required' && (
                  <p className="text-danger">Ngày sinh là bắt buộc</p>
                )}
              </CCol>
            </CRow>

            <CRow className="mt-2 mb-3">
              <CFormLabel htmlFor="inputPhone" className="col-sm-2 col-form-label">
                Số điện thoại
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="phone"
                  id="inputPhone"
                  placeholder="Số điện thoại"
                  readOnly
                  plainText
                  autoComplete="phone"
                  {...register('phone', {})}
                  feedback={errors.phone?.message}
                />
                {errors.phone?.type === 'required' && (
                  <p className="text-danger">Số điện thoại là bắt buộc</p>
                )}
                {errors.phone?.type === 'pattern' && (
                  <p className="text-danger">Số điện thoại không hợp lệ</p>
                )}
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CFormLabel htmlFor="optRole" className="col-sm-2 col-form-label">
                Vai trò
              </CFormLabel>
              <CCol sm={10}>
                <select
                  className="form-select"
                  id="optRole"
                  name="optRole"
                  {...register('role', { required: 'Vui lòng chọn vai trò' })}
                >
                  <option value="0">Cán bộ Sở VH-TT</option>
                  <option value="1">Cán bộ Quận</option>
                  <option value="2">Cán bộ Phường</option>
                </select>
              </CCol>
            </CRow>
            {role == '2' && (
              <CRow className="mb-3">
                <CFormLabel htmlFor="optWard" className="col-sm-2 col-form-label">
                  Phường
                </CFormLabel>
                <CCol sm={10}>
                  <select
                    className="form-select"
                    id="optWard"
                    name="optWard"
                    {...register('ward_id', { required: 'Vui lòng chọn phường' })}
                  >
                    {wards.rows.map((ward) => (
                      <option key={ward.id} value={ward.id}>
                        {ward.name}
                      </option>
                    ))}
                  </select>
                </CCol>
              </CRow>
            )}
            {role == '1' && (
              <CRow className="mb-3">
                <CFormLabel htmlFor="optDistrict" className="col-sm-2 col-form-label">
                  Quận
                </CFormLabel>
                <CCol sm={10}>
                  <select
                    className="form-select"
                    id="optDistrict"
                    name="optDistrict"
                    {...register('district_id', { required: 'Vui lòng chọn quận' })}
                  >
                    {districts.rows.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </CCol>
              </CRow>
            )}
          </Box>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={onClose}>
            Đóng
          </CButton>
          <Button
            variant="contained"
            type="submit"
            startIcon={<SaveIcon />}
            color="primary"
            readOnly
            plainText={!formState.isDirty}
            sx={{
              borderRadius: '8px',
            }}
          >
            Lưu
          </Button>
        </CModalFooter>
      </CForm>
    </CModal>
  )
}

AccountAssignModal.propTypes = {
  user: PropTypes.object,
  onClose: PropTypes.func,
}

export default AccountAssignModal
