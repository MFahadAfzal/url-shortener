const db = require('./db')
const { toBase62 } = require('./utils')

const home = (req, res) => {
    res.send("Hello World!")
}

//setting up new row and creating shortUrl
const create = async (req, res) => {
    const row = await db.oneOrNone('INSERT INTO urls (longurl, expires_at) VALUES ($1, $2) RETURNING *', [req.body.longurl,req.body.expires_at || null])
    console.log(row)
    const code = toBase62(row.id)
    const updated = await db.oneOrNone('UPDATE urls SET shorturl = $1 WHERE id = $2 RETURNING *', [code, row.id])
    console.log(updated)
    res.status(201).json(updated)
}

//updating shorturl
const update = async (req, res) => {
    const id = req.params.id
    const exists = await db.oneOrNone('SELECT * FROM urls WHERE id = $1', id)

    if(!exists) return res.status(404).send()

    const copy = await db.oneOrNone('SELECT * FROM urls WHERE shorturl = $1', req.body.shortUrl)
    if(copy) return res.status(400).send()
    
    const updated = await db.oneOrNone('UPDATE urls SET shorturl = $1 WHERE id = $2 RETURNING *', [req.body.shortUrl, id])
    if(updated) return res.status(200).json(updated)
    
    return res.status(400).send()
}

//deleting shorturl
const remove = async (req, res) => {
    const id = req.params.id
    const deleted = await db.oneOrNone('DELETE FROM urls WHERE id = $1 RETURNING *', id)
    deleted ? res.status(204).send() : res.status(404).send()
}

//getting all the statistics for the shorturl
const getStats = async (req, res) => {
    const id = req.params.id
    const clicksData = await db.manyOrNone('SELECT * FROM clicks WHERE urlid = $1', id)
    const urlData = await db.oneOrNone('SELECT * FROM urls WHERE id = $1', id)
    if (!urlData) return res.status(404).json({ error: 'Short URL not found' })
    return res.json({clicksData, urlData})
}

//basic function to redirect user to long url
const redirect = async (req, res) => {
    const shortUrl = req.params.code
    const now = new Date()
    const data = await db.oneOrNone('SELECT id, longurl, expires_at FROM urls WHERE shorturl = $1', shortUrl)
    if (!data) return res.status(404).json({ error: 'Short URL not found' })
    
    if(data.expires_at){
        if (now > data.expires_at){
            res.redirect(process.env.FRONTEND_URL)
        }
    }

    await db.none('INSERT INTO clicks (urlid) VALUES ($1)', data.id)
    res.redirect(data.longurl)
}

module.exports = { home, create, update, remove, getStats, redirect }