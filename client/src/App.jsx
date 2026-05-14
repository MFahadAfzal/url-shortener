import { useState } from 'react'
import api from './services/api'
const baseUrl = import.meta.env.VITE_API_URL

function App() {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('Nothing Yet')

  const genShortUrl = async() => {
      let url = longUrl
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`
      }
      const body = {longurl: url}
      const data = await api.create(body)
      setShortUrl(`${baseUrl}/${data.shorturl}`)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background-tertiary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      
      <div style={{ width: '100%', maxWidth: '520px' }}>
        
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 className="text-2xl font-medium mb-2">Shortly</h1>
          <p className="text-sm text-gray-500">Paste a long URL and get a short one instantly.</p>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <label className="block text-xs text-gray-500 mb-1">Long URL</label>
          <input value={longUrl} onChange={e => setLongUrl(e.target.value)} type="text" placeholder="https://example.com/your/very/long/url" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <button onClick={() => genShortUrl()} className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600">Shorten URL</button>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-400 mb-1">Your short URL</p>
            
            <div className="flex items-center justify-between gap-3">
              <span className="text-blue-500 text-sm font-medium break-all">{shortUrl}</span>
              <button className="text-xs text-gray-500 hover:text-gray-700 flex-shrink-0">Copy</button>
            </div>
          
          </div>
        
        </div>
        
        <p className="text-center text-xs text-gray-400 mt-4">Links expire after 7 days</p>
      
      </div>
    </div>
  )
}

export default App



