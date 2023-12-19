import { cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import React, { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { resetPasswordEmail, sendEmailOTP, verifyEmail } from 'src/services/auth'

const ForgotPassword = () => {
  const [error, setError] = React.useState(null)
  const [email, setEmail] = React.useState(null)
  const [step, setStep] = React.useState(0)
  const navigate = useNavigate()
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({})

  const onSendEmail = (data) => {
    sendEmailOTP(data.email).then((res) => {
      if (res.error) {
        setError(res.error)
      } else {
        setEmail(data.email)
        setStep(1)
      }
    })
  }

  const onVerify = (data) => {
    verifyEmail(email, data.otp).then((res) => {
      if (res.error) {
        setError(res.error)
      } else {
        setStep(2)
      }
    })
  }

  const onChangePassword = (data) => {
    resetPasswordEmail(email, data.newPassword, data.rePassword).then((res) => {
      if (res.error) {
        setError(res.error)
      } else {
        navigate('/login')
      }
    })
  }
  const onSubmit = (data) => {
    if (step === 0) {
      onSendEmail(data)
    } else if (step === 1) {
      onVerify(data)
    } else {
      onChangePassword(data)
    }
  }

  const onBack = () => {
    navigate('/login')
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  {/* Button back */}
                  <CButton color="primary" className="mb-3" onClick={onBack}>
                    Back
                  </CButton>

                  <CForm onSubmit={handleSubmit(onSubmit)}>
                    <h1>Forgot Password</h1>
                    {step === 0 ? (
                      <Fragment key={0}>
                        <p className="text-medium-emphasis">Please input your email</p>

                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput
                            placeholder="Email"
                            autoComplete="email"
                            {...register('email', {
                              required: true,
                              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                            })}
                          />
                        </CInputGroup>
                        {
                          // required
                          errors.email?.type === 'required' && (
                            <p className="text-danger">Email is required</p>
                          )
                        }
                        {
                          // pattern
                          errors.email?.type === 'pattern' && (
                            <p className="text-danger">Email is invalid</p>
                          )
                        }

                        <CRow>
                          <CCol xs={6}>
                            <CButton color="primary" className="px-4" type="submit">
                              Send Email
                            </CButton>
                          </CCol>
                        </CRow>
                      </Fragment>
                    ) : step === 1 ? (
                      <Fragment key={1}>
                        <p className="text-medium-emphasis">Please input your otp</p>

                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput
                            {...register('otp', {
                              required: true,
                            })}
                            type="number"
                          />
                        </CInputGroup>
                        {
                          // required
                          errors.otp?.type === 'required' && (
                            <p className="text-danger">OTP is required</p>
                          )
                        }

                        <CRow>
                          <CCol xs={6}>
                            <CButton color="primary" className="px-4" type="submit">
                              Verify
                            </CButton>
                          </CCol>
                        </CRow>
                      </Fragment>
                    ) : (
                      <Fragment key={2}>
                        <p className="text-medium-emphasis">Please input new password</p>

                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput
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
                            autoComplete="new-password"
                            placeholder="Please enter your new password"
                            type="password"
                          />
                        </CInputGroup>
                        {
                          // required
                          errors.newPassword?.type === 'required' && (
                            <p className="text-danger">New password is required</p>
                          )
                        }
                        {
                          // pattern
                          errors.newPassword?.type === 'validate' && (
                            <p className="text-danger">
                              Password must be at least 8 characters, at least one letter and one
                              number, and one special character
                            </p>
                          )
                        }
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput
                            {...register('rePassword', {
                              required: true,
                              validate: (value) => {
                                if (value.length < 8) {
                                  return false
                                }
                                if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                                  return false
                                }
                                if (value !== watch('newPassword')) {
                                  return false
                                }
                              },
                            })}
                            placeholder="Please re-enter your password"
                            type="password"
                          />
                        </CInputGroup>
                        {
                          // required
                          errors.rePassword && (
                            <p className="text-danger">Re-Password is not matched</p>
                          )
                        }

                        <CRow>
                          <CCol xs={6}>
                            <CButton color="primary" className="px-4" type="submit">
                              Change
                            </CButton>
                          </CCol>
                        </CRow>
                      </Fragment>
                    )}
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ForgotPassword
