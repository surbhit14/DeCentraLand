import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import NFTList from './pages/NFTList';
import OwnedNFT from './pages/OwnedNFT';
import Login from './pages/Login';
import GetTransaction from './pages/GetTransaction';

function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/nftlist" element={<NFTList />} />
          <Route path="/ownednfts" element={<OwnedNFT />} />
          <Route path="/viewtransactions" element={<GetTransaction />} />
          {/* <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;