import './App.css';
import { AdsPanelDetailProvider } from './contexts/AdsPanelDetailProvider';
import { AdsSpotProvider } from './contexts/AdsSpotProvider';
import { ModalReportProvider } from './contexts/ModalReportProvider';
import LandingPage from './pages/LandingPage/LandingPage';

function App() {
  return (
    <div className='App'>
      <AdsSpotProvider>
        <AdsPanelDetailProvider>
          <ModalReportProvider>
            <LandingPage />
          </ModalReportProvider>
        </AdsPanelDetailProvider>
      </AdsSpotProvider>
    </div>
  );
}

export default App;
