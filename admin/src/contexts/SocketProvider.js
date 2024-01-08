import React, { useReducer, createContext } from 'react'
import PropTypes from 'prop-types'
import io from 'socket.io-client'

export const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
  const socket = io.connect(process.env.REACT_APP_BACKEND_URL)

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
}

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
