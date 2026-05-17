import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home'
import Analytics from './pages/Analytics'

function App() {
  return (
    <BrowserRouter>
    
      <nav>
        <Link to="/">Shorten Url</Link> |{" "}
        <Link to="/analytics">Analytics</Link> |{" "}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App