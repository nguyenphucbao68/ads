import React, { useReducer, createContext } from 'react'
import PropTypes from 'prop-types'

export const AdsLicenseContext = createContext({
  adsLicences: {
    loading: false,
    rows: [],
    pageSize: 25,
    page: 0,
  },
  dispatchAdsLicenses: () => {},
})

const adsLicenseReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_ADS_LICENSES': {
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

const initialAdsLicense = {
  loading: false,
  rows: [],
  pageSize: 25,
  page: 0,
}

export const AdsLicenseProvider = ({ children }) => {
  const [adsLicences, dispatchAdsLicenses] = useReducer(adsLicenseReducer, initialAdsLicense)

  return (
    <AdsLicenseContext.Provider value={{ adsLicences, dispatchAdsLicenses }}>
      {children}
    </AdsLicenseContext.Provider>
  )
}

AdsLicenseProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
