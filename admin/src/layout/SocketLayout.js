import React, { useEffect, useState } from 'react'
import { SocketProvider } from 'src/contexts/SocketProvider'
import { Outlet } from 'react-router-dom'
const SocketLayout = () => {
  return (
    <SocketProvider>
      <Outlet />
    </SocketProvider>
  )
}

export default SocketLayout
