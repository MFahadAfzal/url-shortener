const baseUrl = import.meta.env.VITE_API_URL

const create = async(data) => {
    const response = await fetch(`${baseUrl}/shorten`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    if (!response.ok) {
        const error = new Error('Request failed')
        error.status = response.status
        throw error
    }
    return response.json()
}

const stats = async(short) => {
    const response = await fetch(`${baseUrl}/shorten/${short}/stats`)
    return response.json()
}

export default { create, stats }