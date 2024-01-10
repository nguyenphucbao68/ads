import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { CBadge } from '@coreui/react'

export const AppSidebarNav = ({ items }) => {
  const location = useLocation()
  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }
  const roleAdapter = (userRole) => {
    var sideBarRole = -1
    if (userRole == 2 || userRole == 1) sideBarRole = 1
    else if (userRole == 0) sideBarRole = 2
    return sideBarRole
  }
  const sideBarRole = roleAdapter(JSON.parse(localStorage.getItem('user')).role)

  const navItem = (item, index) => {
    const { role, component, name, badge, icon, ...rest } = item
    const Component = component
    return (
      (role == 0 || role == sideBarRole) && (
        <Component
          {...(rest.to &&
            !rest.items && {
              component: NavLink,
            })}
          key={index}
          {...rest}
        >
          {navLink(name, icon, badge)}
        </Component>
      )
    )
  }
  const navGroup = (item, index) => {
    const { role, component, name, icon, to, ...rest } = item
    const Component = component
    return (
      (role == 0 || role == sideBarRole) && (
        <Component
          idx={String(index)}
          key={index}
          toggler={navLink(name, icon)}
          visible={location.pathname.startsWith(to)}
          {...rest}
        >
          {item.items?.map(
            (item, index) =>
              (item.role == 0 || item.role == sideBarRole) &&
              (item.items ? navGroup(item, index) : navItem(item, index)),
          )}
        </Component>
      )
    )
  }

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
