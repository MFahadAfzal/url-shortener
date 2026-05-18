import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Charts from '../components/Charts'
import api from '../services/api'

function Analytics(){
    const [data, setData] = useState(null)
    const [chartData, setChartData] = useState(null)
    const [id, setId] = useState('')
    const { code } = useParams()
    const [inputUrl, setInputUrl] = useState(code || '')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()


    const short = () => {
        setErrorMessage('')
        if (inputUrl.includes('/')) {
            const extractedCode = inputUrl.split('/').pop()
            
            navigate(`/${extractedCode}/analytics`)
        } else {
            setErrorMessage("Please enter a URL")
        }
    }

    useEffect(() => {
        if (code) {
            const fetchStats = async() =>{
                console.log(api)
                const result = await api.stats(code)
                setData(result)
                
                //this is too get the dates and the amount of times it was clicked on that day so i can pass it to charts
                const dateCount = result.clicksData.reduce((acc, obj) =>{
                    const date = new Date(obj.accessed).toLocaleDateString()
                    if (acc[date]){
                        acc[date] = acc[date] + 1
                    }else {
                        acc[date] = 1
                    }
                    return acc
                }, {})
                
                const formattedData = Object.entries(dateCount).map(([date, clicks]) => ({date, clicks}))

                setChartData(formattedData)
                
            }
            fetchStats()
        }
  
    }, [code])

    return(
        <div className="min-h-screen flex flex-col bg-gray-100">
            <div className="flex min-h-50 w-full px-2 py-1 gap-2">

                {/* To enter short url*/}
                <div className="flex flex-1 flex-col bg-white items-center justify-center rounded-xl border border-gray-500 px-1 gap-2">
                    <div className="flex items-center gap-2">
                        <h1 className="text-lg">Enter Short Url:</h1>
                        <input value = {inputUrl} onChange={(e) => setInputUrl(e.target.value)} placeholder="Short Url" className="border border-gray-400 rounded-lg px-3 focus:ring-2 focus:ring-blue-400"></input>
                        <button onClick={() => short()} className="border rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-1">Submit</button>
                    </div>
                    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                </div>


                <div className="flex-1 bg-white rounded-xl border border-gray-500 px-6">
                    {data ? <div className='flex flex-col h-full justify-between p-2'>
                                <p>Short Url: {import.meta.env.VITE_API_URL}/{data.urlData.shorturl}</p>
                                <p>Long Url: {data.urlData.longurl}</p>
                                <p>Created At: {new Date(data.urlData.created_at).toLocaleDateString()}</p>
                                <p>Expires At:{data.urlData.expires_at ? new Date(data.urlData.expires_at).toLocaleDateString() : 'Never'}</p>
                                <p>Clicks: {data.clicksData.length}</p>  
                            </div> : 
                            <h1 className="text-center text-gray-400 text-xl mt-20">Enter a short URL to see analytics</h1>}
                </div>
            </div>

            <div className="flex-1 bg-white rounded-xl border border-gray-500 p-6 mx-2 mb-1 ">
                {data ? <div className='flex '>
                    <div className='flex-1 '><Charts clicksData={chartData}/></div>
                </div> : 
                
                <h1 className="text-center text-gray-400 text-xl mt-20">Enter a short URL to see analytics</h1>}
            </div>
        </div>
    )
}
export default Analytics