import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { Navigate } from 'react-router-dom'

const DefaultLayout = () => {
  const [authenticated, setAuthenticated] = useState(undefined)

  useEffect(() => {
    setAuthenticated(localStorage.getItem('token'))
  }, [])
  if (authenticated === undefined) return null

  return authenticated ? (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  ) : (
    <Navigate exact to={`/login`} />
  )
}

export default DefaultLayout
