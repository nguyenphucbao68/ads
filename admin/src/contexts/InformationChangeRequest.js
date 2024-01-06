import React, { useReducer, createContext } from 'react'
import PropTypes from 'prop-types'

export const ICRContext = createContext({
  ICRs: {
    loading: false,
    rows: [],
    pageSize: 25,
    page: 0,
  },
  dispatchICRs: () => {},
})

const ICRReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_ICRS': {
      return {
        ...state,
        rows: action.payload,
      }
    }

    case 'UPDATE_ICRS': {
      return action.payload
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

const initialICR = {
  loading: false,
  rows: [],
  pageSize: 25,
  page: 0,
}

export const ICRProvider = ({ children }) => {
  const [ICRs, dispatchICRs] = useReducer(ICRReducer, initialICR)

  return <ICRContext.Provider value={{ ICRs, dispatchICRs }}>{children}</ICRContext.Provider>
}

ICRProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
