import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBellExclamation, cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import io from 'socket.io-client'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [notification, setNotification] = useState(false)
  var socket = null
  //
  useEffect(() => {
    socket = io.connect(process.env.REACT_APP_BACKEND_URL)
    socket.emit('joinRoomById', JSON.parse(localStorage.getItem('user')).id)
  }, [])
  useEffect(() => {
    socket.on('updateChangeRequest', (msg) => {
      // console.log(msg)
      setNotification(true)
    })
  }, [socket])

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Trang chủ
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/statistics" component={NavLink}>
              Thống kê
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/admin/wards" component={NavLink}>
              Quản lý
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/profile/info" component={NavLink}>
              Cá nhân
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink
              to="admin/report"
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
              component={NavLink}
              onClick={() => setNotification(false)}
            >
              {notification && (
                <span
                  style={{
                    display: 'inline-block',
                    color: 'red',
                  }}
                >
                  Yêu cầu chỉnh sửa được cập nhật
                </span>
              )}
              <CIcon
                style={{
                  color: notification ? 'red' : 'initial',
                }}
                icon={notification ? cilBellExclamation : cilBell}
                size="lg"
              />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
