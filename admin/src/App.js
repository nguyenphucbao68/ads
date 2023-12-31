import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { AdsSpotProvider } from './contexts/AdsSpotProvider'
import { AdsTypeProvider } from './contexts/AdsTypeProvider'
import { DistrictProvider } from './contexts/DistrictProvider'
import { SpotTypeProvider } from './contexts/SpotTypeProvider'
import { WardProvider } from './contexts/WardProvider'
import './scss/style.scss'
import ForgotPassword from './pages/forgot-password'
import { UserProvider } from './contexts/UserProvider'
import { AdsLicenseProvider } from './contexts/AdsLicenseProvider'
import { ReportProvider } from './contexts/ReportProvider'
import { AdsPanelProvider } from './contexts/AdsPanelProvider'
import { ICRProvider } from './contexts/InformationChangeRequest'
import DefaultLayout from './layout/DefaultLayout'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers

// Pages
const Login = React.lazy(() => import('./pages/login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route
            exact
            path="/forgot-password"
            name="Forgot Password"
            element={<ForgotPassword />}
          />

          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route
            path="*"
            name="Home"
            element={
              <ICRProvider>
                <AdsPanelProvider>
                  <AdsLicenseProvider>
                    <DistrictProvider>
                      <WardProvider>
                        <ReportProvider>
                          <AdsTypeProvider>
                            <SpotTypeProvider>
                              <AdsSpotProvider>
                                <UserProvider>
                                  <DefaultLayout />
                                </UserProvider>
                              </AdsSpotProvider>
                            </SpotTypeProvider>
                          </AdsTypeProvider>
                        </ReportProvider>
                      </WardProvider>
                    </DistrictProvider>
                  </AdsLicenseProvider>
                </AdsPanelProvider>
              </ICRProvider>
            }
          />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
