import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'
import { useForm } from 'react-hook-form'
import { changePassword } from 'src/services/auth'

const AccountUpdatePassword = () => {
  const [error, setError] = React.useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    criteriaMode: 'all',
  })

  const onUpdate = (data) => {
    setError('')
    changePassword(data.currentPassword, data.newPassword, data.rePassword)
      .then((res) => {
        alert('Update success')
        reset()
      })
      .catch((err) => {
        setError(err.response.data.message)
      })
  }
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>UPDATE YOUR PASSWORD</strong>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit(onUpdate)}>
          <CRow className="mb-3">
            <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
              Current Password
            </CFormLabel>
            <div className="col-sm-10">
              <CFormInput
                type="password"
                id="inputPassword"
                {...register('currentPassword', {
                  required: true,
                  validate: (value) => {
                    if (value.length < 8) {
                      return false
                    }
                    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                      return false
                    }
                  },
                })}
              />
              {errors.currentPassword?.type === 'required' && (
                <p className="text-danger">Current Password is required</p>
              )}
              {errors.currentPassword?.type === 'validate' && (
                <p className="text-danger">
                  Password must be at least 8 characters, at least one letter and one number, and
                  one special character
                </p>
              )}
            </div>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
              New Password
            </CFormLabel>
            <div className="col-sm-10">
              <CFormInput
                type="password"
                id="inputPassword"
                {...register('newPassword', {
                  required: true,
                  validate: (value) => {
                    if (value.length < 8) {
                      return false
                    }
                    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                      return false
                    }
                  },
                })}
              />
              {errors.newPassword?.type === 'required' && (
                <p className="text-danger">New Password is required</p>
              )}
              {errors.newPassword?.type === 'validate' && (
                <p className="text-danger">
                  Password must be at least 8 characters, at least one letter and one number, and
                  one special character
                </p>
              )}
            </div>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
              Re-Password
            </CFormLabel>
            <div className="col-sm-10">
              <CFormInput
                type="password"
                id="inputPassword"
                {...register('rePassword', {
                  required: true,
                  validate: (value) => {
                    if (value.length < 8) {
                      return false
                    }
                    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                      return false
                    }
                  },
                })}
              />
              {errors.rePassword?.type === 'required' && (
                <p className="text-danger">Re-Password is required</p>
              )}
              {errors.rePassword?.type === 'validate' && (
                <p className="text-danger">
                  Password must be at least 8 characters, at least one letter and one number, and
                  one special character
                </p>
              )}
            </div>
          </CRow>
          <CRow>
            <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label"></CFormLabel>
            <div className="col-sm-10">
              <CButton type="submit">Update</CButton>
            </div>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default AccountUpdatePassword
