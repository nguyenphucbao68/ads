import React, { useReducer, createContext } from 'react'
import PropTypes from 'prop-types'

export const UserContext = createContext()

const userReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_USERS': {
      return {
        ...state,
        rows: action.payload,
      }
    }

    case 'TURN_ON_LOADING': {
      return {
        ...state,
        loading: true,
      }
    }

    case 'TURN_OFF_LOADING': {
      return {
        ...state,
        loading: false,
      }
    }

    case 'CHANGE_PAGINATION_MODEL': {
      return {
        ...state,
        page: action.payload.page,
        pageSize: action.payload.pageSize,
      }
    }

    default:
      return state
  }
}

const initialUser = {
  loading: false,
  rows: [],
  pageSize: 25,
  page: 0,
}

export const UserProvider = ({ children }) => {
  const [users, dispatchUsers] = useReducer(userReducer, initialUser)

  return <UserContext.Provider value={{ users, dispatchUsers }}>{children}</UserContext.Provider>
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
