import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import { ReactComponent as AdministratorIcon } from 'src/assets/icons/administrator.svg'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const user = JSON.parse(localStorage.getItem('user'))
  if (!user) return null
  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <AdministratorIcon
          style={{
            color: '#ffffff',
            height: '40px',
            width: '40px',
            marginRight: '10px',
          }}
        />
        <span className="mt-2 fw-bold" style={{ fontSize: '1.2rem' }}>
          {user.role === 0
            ? 'Cán bộ Sở VH-TT'
            : user.role === 1
            ? `Cán bộ ${user?.district?.name || 'Quận'}`
            : `Cán bộ ${user?.ward?.name || 'Phường'}`}
        </span>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
