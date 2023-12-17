import React, { useReducer, createContext } from 'react'
import PropTypes from 'prop-types'

export const WardContext = createContext({
  wards: {
    loading: false,
    rows: [],
    pageSize: 25,
    page: 0,
  },
  dispatchWards: () => {},
})

const wardReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_WARDS': {
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

const initialWard = {
  loading: false,
  rows: [],
  pageSize: 25,
  page: 0,
}

export const WardProvider = ({ children }) => {
  const [wards, dispatchWards] = useReducer(wardReducer, initialWard)

  return <WardContext.Provider value={{ wards, dispatchWards }}>{children}</WardContext.Provider>
}

WardProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
