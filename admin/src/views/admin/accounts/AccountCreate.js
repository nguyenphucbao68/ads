import React, { useContext, useEffect } from 'react'

import { Box, Button, Grid } from '@mui/material'
import { CCard, CCardBody, CForm, CCol, CRow, CFormLabel, CFormInput } from '@coreui/react'
import SaveIcon from '@mui/icons-material/Save'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'sonner'
import { WardContext } from 'src/contexts/WardProvider'
import { DistrictContext } from 'src/contexts/DistrictProvider'
import * as wardService from 'src/services/ward'
import * as districtService from 'src/services/district'
import * as userService from 'src/services/user'

const AccountCreate = () => {
  const { wards, dispatchWards } = useContext(WardContext)
  const { districts, dispatchDistricts } = useContext(DistrictContext)

  const {
    register,
    handleSubmit,
    watch,
    formState,
    reset,
    formState: { errors },
  } = useForm({
    values: {
      email: '',
      name: '',
      password: '',
      phone: '',
      role: 0,
      ward_id: 1,
      district_id: 1,
    },
  })
  const role = watch('role')

  const onSubmit = async (data) => {
    const formatData = {
      email: data.email,
      name: data.name,
      dob: data.dob,
      password: data.password,
      phone: data.phone,
      role: parseInt(data.role, 10),
    }
    if (role === '2') {
      formatData.ward_id = parseInt(data.ward_id, 10)
    } else if (role === '1') {
      formatData.district_id = parseInt(data.district_id, 10)
    }
    const result = await userService.createUser(formatData)
    if (result && result.id) {
      toast.success('Thêm tài khoản cán bộ thành công')
      reset()
    } else {
      toast.error('Thêm tài khoản cán bộ thất bại')
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
    <CCard
      className="mb-4"
      sx={{
        backgroundColor: '#fff',
      }}
    >
      <Toaster position="top-right" reverseOrder={false} />
      <CCardBody>
        <h4 id="ads-spots-title" className="card-title">
          Tạo tài khoản cán bộ
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
              <CFormLabel htmlFor="inputEmail" className="col-sm-2 col-form-label">
                Email
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  id="inputEmail"
                  placeholder="Email"
                  autoComplete="email"
                  {...register('email', {
                    required: 'Vui lòng nhập email',
                    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  })}
                  feedback={errors.email?.message}
                />{' '}
                {errors.email?.type === 'required' && (
                  <p className="text-danger">Email là bắt buộc</p>
                )}
                {errors.email?.type === 'pattern' && (
                  <p className="text-danger">Email không hợp lệ</p>
                )}
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
                  autoComplete="name"
                  {...register('name', {
                    required: 'Vui lòng nhập họ và tên',
                  })}
                  feedback={errors.name?.message}
                />{' '}
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
                  autoComplete="dob"
                  {...register('dob', {
                    required: 'Vui lòng nhập ngày sinh',
                  })}
                  feedback={errors.dob?.message}
                />
                {errors.dob?.type === 'required' && (
                  <p className="text-danger">Ngày sinh là bắt buộc</p>
                )}
              </CCol>
            </CRow>

            <CRow className="mt-2 mb-3">
              <CFormLabel htmlFor="inputName" className="col-sm-2 col-form-label">
                Mật khẩu
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="password"
                  id="inputPassword"
                  placeholder="Mật khẩu"
                  autoComplete="password"
                  {...register('password', {
                    required: 'Vui lòng nhập mật khẩu',
                    validate: (value) => {
                      if (value.length < 8) {
                        return false
                      }
                      if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                        return false
                      }
                      return true
                    },
                  })}
                  feedback={errors.password?.message}
                />{' '}
                {errors.password && (
                  <p className="text-danger">
                    Mật khẩu phải có ít nhất 8 ký tự, ít nhất một chữ cái và một số, và một ký tự
                    đặc biệt
                  </p>
                )}
              </CCol>
            </CRow>

            {/* <CRow className="mt-2 mb-3">
              <CFormLabel htmlFor="inputName" className="col-sm-2 col-form-label">
                Nhập lại mật khẩu
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  id="inputRepassword"
                  placeholder="Nhập lại mật khẩu"
                  autoComplete="current-password"
                  {...register('rePassword', {
                    required: 'Vui lòng nhập lại mật khẩu',
                    validate: (value) => {
                      if (value !== formState.values.password) {
                        return false
                      }
                    },
                  })}
                  feedback={errors.password?.message}
                />{' '}
                {errors.rePassword && <p className="text-danger">Nhập lại mật khẩu không khớp</p>}
              </CCol>
            </CRow> */}

            <CRow className="mt-2 mb-3">
              <CFormLabel htmlFor="inputPhone" className="col-sm-2 col-form-label">
                Số điện thoại
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="phone"
                  id="inputPhone"
                  placeholder="Số điện thoại"
                  autoComplete="phone"
                  {...register('phone', {
                    required: 'Vui lòng nhập họ và tên',
                    pattern: /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/,
                  })}
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
            {role === '2' && (
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
            {role === '1' && (
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
                  variant="contained"
                  type="submit"
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

export default AccountCreate
