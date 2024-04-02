import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import LandingPage from './pages/landing/LandingPage';
import FaucetFlywheelPage from './pages/faucet_flywheel/FaucetFlywheelPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/faulcet-flywheel" element={<FaucetFlywheelPage />} />
      </Routes>
    </Router>
  );
}

export default App;
