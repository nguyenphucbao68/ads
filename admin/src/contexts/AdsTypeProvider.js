import React, { useReducer, createContext } from 'react'
import PropTypes from 'prop-types'

export const AdsTypeContext = createContext({
  adsTypes: {
    loading: false,
    rows: [],
    pageSize: 25,
    page: 0,
  },
  dispatchAdsTypes: () => {},
})

const adsTypeReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_ADS_TYPES': {
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

const initialAdsType = {
  loading: false,
  rows: [],
  pageSize: 25,
  page: 0,
}

export const AdsTypeProvider = ({ children }) => {
  const [adsTypes, dispatchAdsTypes] = useReducer(adsTypeReducer, initialAdsType)

  return (
    <AdsTypeContext.Provider value={{ adsTypes, dispatchAdsTypes }}>
      {children}
    </AdsTypeContext.Provider>
  )
}

AdsTypeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
