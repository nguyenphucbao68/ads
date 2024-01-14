import './App.css';
import { AdsPanelDetailProvider } from './contexts/AdsPanelDetailProvider';
import { AdsSpotProvider } from './contexts/AdsSpotProvider';
import { ModalReportProvider } from './contexts/ModalReportProvider';
import { WardProvider } from './contexts/WardProvider';
import LandingPage from './pages/LandingPage/LandingPage';

function App() {
  return (
    <div className='App'>
      <AdsSpotProvider>
        <AdsPanelDetailProvider>
          <ModalReportProvider>
            <WardProvider>
              <LandingPage />
            </WardProvider>
          </ModalReportProvider>
        </AdsPanelDetailProvider>
      </AdsSpotProvider>
    </div>
  );
}

export default App;
