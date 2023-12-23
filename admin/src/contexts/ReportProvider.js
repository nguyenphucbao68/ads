import React, { useReducer, createContext } from 'react'
import PropTypes from 'prop-types'

export const ReportContext = createContext({
  wards: {
    loading: false,
    rows: [],
    pageSize: 25,
    page: 0,
  },
  dispatchReports: () => {},
})

const reportReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_REPORTS': {
      return {
        ...state,
        rows: action.payload,
      }
    }

    case 'UPDATE_REPORTS': {
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

const initialReport = {
  loading: false,
  rows: [],
  pageSize: 25,
  page: 0,
}

export const ReportProvider = ({ children }) => {
  const [reports, dispatchReports] = useReducer(reportReducer, initialReport)

  return (
    <ReportContext.Provider value={{ reports, dispatchReports }}>{children}</ReportContext.Provider>
  )
}

ReportProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
