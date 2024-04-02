import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import LandingPage from './pages/landing/LandingPage';
import FaulcetFkywheelPage from './pages/faucet_wheel/FaulcetFkywheelPage';
import BuyNFTPage from './pages/buy_nft/BuyNFTPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/faucet-flywheel" element={<FaulcetFkywheelPage />} />
        <Route path="/buy-nft" element={<BuyNFTPage />} />
      </Routes>
    </Router>
  );
}

export default App;
