import { useState } from 'react'
import api from '../services/api'
const baseUrl = import.meta.env.VITE_API_URL

function Home() {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('Nothing Yet')
  const [expiryDate, setExpiryDate] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  const genShortUrl = async() => {
      setErrorMessage('')
      let url = longUrl
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`
      }
      if(URL.canParse(url)){
        const body = {longurl: url}

        if(expiryDate !== ''){
          body.expires_at = expiryDate
        }
        const data = await api.create(body)
        setShortUrl(`${baseUrl}/${data.shorturl}`)

      }else{
        setErrorMessage("Please enter a URL")
      }
      
  }

  return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-lg">

            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-2xl font-medium mb-2">Slim Link</h1>
                <p className="text-sm text-gray-500">Paste a long URL and get a short one instantly.</p>
            </div>

            {/* Form card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4">

                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

                <div>
                <label className="block text-xs text-gray-500 mb-1">Long URL</label>
                <input value={longUrl} onChange={e => setLongUrl(e.target.value)} type="text" placeholder="https://example.com/your/very/long/url" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>

                {/* Set Expiration */}
                <div>
                    <label className="block text-xs text-gray-500 mb-1"> Expiry date <span className="text-xs text-gray-400">(optional)</span> </label>
                    <input type="date" min={minDate} value={expiryDate} onChange={e => setExpiryDate(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                </div>

                <button onClick={() => genShortUrl()} className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600"> Shorten URL </button>

                {/* Result */}
                <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-400 mb-2">Your short URL</p>
                    <div className="flex items-center justify-between gap-3">
                        <span data-testid="short-url" className="text-blue-500 text-sm font-medium break-all">
                        {shortUrl}
                        </span>
                        <button onClick={() => navigator.clipboard.writeText(shortUrl)} className="text-xs text-gray-500 hover:text-gray-700 flex-shrink-0">
                        Copy
                        </button>
                    </div>
                </div>

            </div>

                <p className="text-center text-xs text-gray-400 mt-4">Links expire after 7 days</p>

            </div>
        </div>
    )
}

export default Home
