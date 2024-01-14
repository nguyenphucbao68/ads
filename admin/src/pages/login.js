import React, { useContext } from 'react'
import { cilLockLocked, cilUser } from '@coreui/icons'
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
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { login } from 'src/services/auth'

const Login = () => {
  const [error, setError] = React.useState(null)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
  })
  const onSubmit = (data) => {
    setError('')
    login(data.email, data.password)
      .then((res) => {
        localStorage.setItem('token', res.access.token)
        localStorage.setItem('refreshToken', res.refreshToken.token)
        navigate(`/`)
      })
      .catch((err) => {
        setError(err.response.data.message)
      })
  }

  const onNavigateForgotPassword = () => {
    navigate('/forgot-password')
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit(onSubmit)}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
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
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        // pass at least 8 characters
                        {...register('password', {
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
                    </CInputGroup>
                    {errors.password && (
                      <p className="text-danger">
                        Password must be at least 8 characters, at least one letter and one number,
                        and one special character
                      </p>
                    )}
                    {error && <p className="text-danger">{error}</p>}
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0" onClick={onNavigateForgotPassword}>
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Logo</h2>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
