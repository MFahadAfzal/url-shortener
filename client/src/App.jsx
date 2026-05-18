import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home'
import Analytics from './pages/Analytics'

function App() {
  return (
    <BrowserRouter>
    
      <nav className='flex justify-between px-10 py-5 text-xl border-b border-gray-500'>
        <Link to="/">Shorten Url</Link>{" "}
        <Link to="/analytics">Analytics</Link>{" "}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/:code/analytics" element={<Analytics />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App