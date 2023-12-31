import './App.css';
import { AdsPanelDetailProvider } from './contexts/AdsPanelDetailProvider';
import LandingPage from './pages/LandingPage/LandingPage';

function App() {
  return (
    <div className='App'>
      <AdsPanelDetailProvider>
        <LandingPage />
      </AdsPanelDetailProvider>
    </div>
  );
}

export default App;
