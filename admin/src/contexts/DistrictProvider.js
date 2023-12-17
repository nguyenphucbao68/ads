import React, { useReducer, createContext } from 'react'
import PropTypes from 'prop-types'

export const DistrictContext = createContext({
  districts: {
    loading: false,
    rows: [],
    pageSize: 25,
    page: 0,
  },
  dispatchDistricts: () => {},
})

const districtReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_DISTRICTS': {
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

const initialDistrict = {
  loading: false,
  rows: [],
  pageSize: 25,
  page: 0,
}

export const DistrictProvider = ({ children }) => {
  const [districts, dispatchDistricts] = useReducer(districtReducer, initialDistrict)

  return (
    <DistrictContext.Provider value={{ districts, dispatchDistricts }}>
      {children}
    </DistrictContext.Provider>
  )
}

DistrictProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
