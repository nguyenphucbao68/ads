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
import React from 'react'
import { useForm } from 'react-hook-form'
import { getProfile, updateProfile } from 'src/services/user'

const AccountUpdateInformation = () => {
  const [error, setError] = React.useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
    defaultValues: async () => {
      const res = await getProfile()
      // handle dob format
      res.dob = res.dob.split('T')[0]

      return {
        email: res.email,
        name: res.name,
        phone: res.phone,
        dob: res.dob,
      }
    },
  })

  const onUpdate = (data) => {
    setError('')
    updateProfile(data)
      .then((res) => {
        alert('Update success')
      })
      .catch((err) => {
        setError(err.response.data.message)
      })
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>YOUR ACCOUNT</strong>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit(onUpdate)}>
          <CRow className="mb-3">
            <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
              Email
            </CFormLabel>
            <div className="col-sm-10">
              <CFormInput
                type="text"
                id="staticEmail"
                defaultValue="email@example.com"
                readOnly
                plainText
                {...register('email', {
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                })}
              />
            </div>
            {errors.email?.type === 'required' && (
              <div className="col-sm-10 offset-sm-2 text-danger">Email is required</div>
            )}
            {errors.email?.type === 'pattern' && (
              <div className="col-sm-10 offset-sm-2 text-danger">Email is invalid</div>
            )}
          </CRow>
          {/* Birthday, Full Name, Phone number */}
          <CRow className="mb-3">
            <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
              Birthday
            </CFormLabel>
            <div className="col-sm-10">
              <CFormInput
                type="date"
                id="inputPassword"
                {...register('dob', {
                  required: true,
                })}
              />
            </div>

            {errors.dob?.type === 'required' && (
              <div className="col-sm-10 offset-sm-2 text-danger">Birthday is required</div>
            )}
          </CRow>

          {/*  Full Name */}
          <CRow className="mb-3">
            <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
              Full Name
            </CFormLabel>
            <div className="col-sm-10">
              <CFormInput
                type="text"
                id="inputPassword"
                {...register('name', { required: true })}
              />
            </div>
            {errors.name?.type === 'required' && (
              <div className="col-sm-10 offset-sm-2 text-danger">Full Name is required</div>
            )}
          </CRow>

          {/* Phone number */}
          <CRow className="mb-3">
            <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
              Phone number
            </CFormLabel>
            <div className="col-sm-10">
              <CFormInput
                type="text"
                id="inputPassword"
                {...register('phone', {
                  required: true,
                  pattern: /^[0-9]*$/,
                })}
              />
            </div>
            {errors.phone?.type === 'required' && (
              <div className="col-sm-10 offset-sm-2 text-danger">Phone number is required</div>
            )}
            {errors.phone?.type === 'pattern' && (
              <div className="col-sm-10 offset-sm-2 text-danger">Phone number is invalid</div>
            )}
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

export default AccountUpdateInformation
