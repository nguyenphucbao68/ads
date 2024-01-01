import './App.css';
import { AdsPanelDetailProvider } from './contexts/AdsPanelDetailProvider';
import { AdsSpotProvider } from './contexts/AdsSpotProvider';
import LandingPage from './pages/LandingPage/LandingPage';

function App() {
  return (
    <div className='App'>
      <AdsSpotProvider>
        <AdsPanelDetailProvider>
          <LandingPage />
        </AdsPanelDetailProvider>
      </AdsSpotProvider>
    </div>
  );
}

export default App;
